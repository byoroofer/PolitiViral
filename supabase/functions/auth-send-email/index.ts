import { Webhook } from "https://esm.sh/standardwebhooks@1.0.0";

type EmailActionType =
  | "email"
  | "email_change"
  | "invite"
  | "magiclink"
  | "reauthentication"
  | "recovery"
  | "signup";

type HookPayload = {
  email_data: {
    email_action_type: EmailActionType;
    redirect_to?: string;
    site_url?: string;
    token: string;
    token_hash: string;
    token_hash_new?: string;
    token_new?: string;
  };
  user: {
    email?: string;
    email_new?: string;
    user_metadata?: Record<string, unknown>;
  };
};

type RenderedEmail = {
  html: string;
  subject: string;
  text: string;
  to: string;
};

type EmailTemplate = {
  actionLabel?: string;
  actionUrl?: string;
  body: string;
  code?: string;
  footer: string;
  heading: string;
  previewText: string;
  secondaryActionLabel?: string;
  secondaryActionUrl?: string;
  subject: string;
};

const resendApiKey = getRequiredEnv("RESEND_API_KEY");
const hookSecret = getRequiredEnv("SEND_EMAIL_HOOK_SECRET").replace("v1,whsec_", "");
const appName = Deno.env.get("AUTH_EMAIL_APP_NAME") ?? "PolitiViral";
const fromEmail = Deno.env.get("AUTH_EMAIL_FROM_EMAIL") ?? "no-reply@politiviral.com";
const fromName = Deno.env.get("AUTH_EMAIL_FROM_NAME") ?? appName;
const primaryColor = Deno.env.get("AUTH_EMAIL_PRIMARY_COLOR") ?? "#0b4bb8";
const supportEmail = Deno.env.get("AUTH_EMAIL_SUPPORT_EMAIL") ?? fromEmail;

Deno.serve(async (request) => {
  if (request.method !== "POST") {
    return jsonResponse({ error: { message: "Method not allowed." } }, 405);
  }

  const payload = await request.text();
  const headers = Object.fromEntries(request.headers);
  const webhook = new Webhook(hookSecret);

  try {
    const verifiedPayload = webhook.verify(payload, headers) as HookPayload;
    const emails = buildEmails(verifiedPayload);

    for (const email of emails) {
      await sendEmail(email);
    }

    return jsonResponse({});
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown send-email hook failure.";

    return jsonResponse(
      {
        error: {
          message,
        },
      },
      401,
    );
  }
});

function buildEmails(payload: HookPayload) {
  const actionType = payload.email_data.email_action_type;

  if (actionType === "email_change") {
    return buildEmailChangeMessages(payload);
  }

  const recipient = payload.user.email;

  if (!recipient) {
    throw new Error("User email is required to send auth email.");
  }

  return [
    renderEmail({
      actionType,
      recipient,
      token: payload.email_data.token,
      tokenHash: payload.email_data.token_hash,
      payload,
    }),
  ];
}

function buildEmailChangeMessages(payload: HookPayload) {
  const emails: RenderedEmail[] = [];
  const currentEmail = payload.user.email;
  const newEmail = payload.user.email_new;
  const nextPath = resolveNextPath(payload.email_data.redirect_to, "email_change");
  const appUrl = resolveAppUrl(payload.email_data);
  const recipientName = getRecipientName(payload.user);

  if (currentEmail && payload.email_data.token_hash_new) {
    const template = renderTemplate({
      actionLabel: "Approve change request",
      actionUrl: buildConfirmUrl({
        appUrl,
        nextPath,
        tokenHash: payload.email_data.token_hash_new,
        type: "email_change",
      }),
      body: newEmail
        ? `We received a request to move your ${appName} login from this address to ${newEmail}. Approve that change from your current inbox to continue.`
        : `We received a request to change the email address on your ${appName} account. Approve that request from your current inbox to continue.`,
      code: payload.email_data.token,
      footer: `If you did not request this email change, you can ignore this message and keep using your current ${appName} sign-in email.`,
      heading: `Confirm this ${appName} email change`,
      previewText: `Approve the email change request for your ${appName} account.`,
      recipientName,
      subject: `Approve your ${appName} email change`,
    });

    emails.push({
      html: template.html,
      subject: template.subject,
      text: template.text,
      to: currentEmail,
    });
  }

  if ((newEmail || currentEmail) && payload.email_data.token_hash) {
    const destinationEmail = newEmail ?? currentEmail;

    if (!destinationEmail) {
      throw new Error("No destination email available for email change flow.");
    }

    const template = renderTemplate({
      actionLabel: "Confirm new email",
      actionUrl: buildConfirmUrl({
        appUrl,
        nextPath,
        tokenHash: payload.email_data.token_hash,
        type: "email_change",
      }),
      body: `Confirm this address as the new email for your ${appName} account so future sign-ins and account notifications use it.`,
      code: payload.email_data.token_new || payload.email_data.token,
      footer: `If you did not request this email change, do not use this link and contact ${supportEmail}.`,
      heading: `Confirm your new ${appName} email`,
      previewText: `Confirm the new email address for your ${appName} account.`,
      recipientName,
      subject: `Confirm your new ${appName} email`,
    });

    emails.push({
      html: template.html,
      subject: template.subject,
      text: template.text,
      to: destinationEmail,
    });
  }

  if (!emails.length) {
    throw new Error("No email change messages were generated.");
  }

  return emails;
}

function renderEmail({
  actionType,
  payload,
  recipient,
  token,
  tokenHash,
}: {
  actionType: EmailActionType;
  payload: HookPayload;
  recipient: string;
  token: string;
  tokenHash: string;
}) {
  const recipientName = getRecipientName(payload.user);
  const nextPath = resolveNextPath(payload.email_data.redirect_to, actionType);
  const appUrl = resolveAppUrl(payload.email_data);
  const actionUrl =
    actionType === "reauthentication"
      ? undefined
      : buildConfirmUrl({
          appUrl,
          nextPath,
          tokenHash,
          type: actionType,
        });

  return {
    ...renderTemplate(
      buildTemplate({
        actionType,
        actionUrl,
        recipientName,
        token,
      }),
    ),
    to: recipient,
  };
}

function buildTemplate({
  actionType,
  actionUrl,
  recipientName,
  token,
}: {
  actionType: EmailActionType;
  actionUrl?: string;
  recipientName: string | null;
  token: string;
}): EmailTemplate {
  switch (actionType) {
    case "signup":
    case "email":
      return {
        actionLabel: "Confirm account",
        actionUrl,
        body: `${greeting(recipientName)} confirm your email address to finish setting up your ${appName} account and return to the app.`,
        code: token,
        footer: `If you did not start a ${appName} signup, you can safely ignore this email.`,
        heading: `Confirm your ${appName} account`,
        previewText: `Confirm your email to finish creating your ${appName} account.`,
        subject: `Confirm your ${appName} account`,
      };
    case "magiclink":
      return {
        actionLabel: "Sign in to PolitiViral",
        actionUrl,
        body: `${greeting(recipientName)} use this secure sign-in link to access your ${appName} workspace without entering a password.`,
        code: token,
        footer: `If you did not request this magic link, you can ignore this email and your ${appName} account will remain secure.`,
        heading: `Your ${appName} magic link`,
        previewText: `Use this secure link to sign in to ${appName}.`,
        subject: `Your ${appName} sign-in link`,
      };
    case "invite":
      return {
        actionLabel: "Accept invitation",
        actionUrl,
        body: `${greeting(recipientName)} you have been invited to join ${appName}. Accept the invitation to finish account setup and continue inside the app.`,
        code: token,
        footer: `If you were not expecting this invitation, you can ignore it or contact ${supportEmail}.`,
        heading: `You are invited to ${appName}`,
        previewText: `Accept your invitation and join ${appName}.`,
        subject: `You are invited to ${appName}`,
      };
    case "recovery":
      return {
        actionLabel: "Reset password",
        actionUrl,
        body: `${greeting(recipientName)} use this secure link to choose a new password for your ${appName} account.`,
        code: token,
        footer: `If you did not request a password reset, you can ignore this email and your current password will keep working.`,
        heading: `Reset your ${appName} password`,
        previewText: `Reset the password for your ${appName} account.`,
        subject: `Reset your ${appName} password`,
      };
    case "reauthentication":
      return {
        body: `${greeting(recipientName)} enter this one-time verification code to finish the secure action you just started in ${appName}.`,
        code: token,
        footer: `If you did not request this verification code, you can ignore this email.`,
        heading: `Your ${appName} verification code`,
        previewText: `Use this code to complete your secure ${appName} action.`,
        subject: `Your ${appName} verification code`,
      };
    default:
      return {
        actionLabel: "Continue",
        actionUrl,
        body: `${greeting(recipientName)} use this secure link to continue with the email action you started in ${appName}.`,
        code: token,
        footer: `If you did not request this email, you can ignore it.`,
        heading: `Continue in ${appName}`,
        previewText: `Continue the email action you started in ${appName}.`,
        subject: `Continue in ${appName}`,
      };
  }
}

function renderTemplate(template: EmailTemplate) {
  const logoUrl =
    Deno.env.get("AUTH_EMAIL_LOGO_URL") ??
    `${resolveBaseUrl(Deno.env.get("AUTH_EMAIL_APP_URL") ?? "https://politiviral.com")}/politiviral-auth-email-logo.svg`;

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(template.subject)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f7fc;color:#0b1020;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      ${escapeHtml(template.previewText)}
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f4f7fc;margin:0;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background-color:#ffffff;border:1px solid #dce4f2;border-radius:24px;overflow:hidden;">
            <tr>
              <td style="padding:32px 32px 12px 32px;">
                <img src="${escapeHtml(logoUrl)}" alt="${escapeHtml(appName)}" width="220" style="display:block;height:auto;max-width:100%;" />
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 32px 32px;">
                <p style="margin:0 0 12px 0;font-size:12px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:${primaryColor};">
                  ${escapeHtml(appName)} Auth
                </p>
                <h1 style="margin:0 0 16px 0;font-size:32px;line-height:1.1;color:#081223;">
                  ${escapeHtml(template.heading)}
                </h1>
                <p style="margin:0 0 24px 0;font-size:16px;line-height:1.7;color:#475467;">
                  ${escapeHtml(template.body)}
                </p>
                ${
                  template.actionLabel && template.actionUrl
                    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px 0;">
                         <tr>
                           <td align="center" bgcolor="${primaryColor}" style="border-radius:999px;">
                             <a href="${escapeHtml(template.actionUrl)}" style="display:inline-block;padding:14px 24px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;">
                               ${escapeHtml(template.actionLabel)}
                             </a>
                           </td>
                         </tr>
                       </table>`
                    : ""
                }
                ${
                  template.secondaryActionLabel && template.secondaryActionUrl
                    ? `<p style="margin:0 0 20px 0;font-size:14px;line-height:1.6;">
                         <a href="${escapeHtml(template.secondaryActionUrl)}" style="color:${primaryColor};font-weight:700;text-decoration:none;">
                           ${escapeHtml(template.secondaryActionLabel)}
                         </a>
                       </p>`
                    : ""
                }
                ${
                  template.code
                    ? `<div style="margin:0 0 24px 0;border:1px solid #dce4f2;border-radius:18px;background-color:#f8fbff;padding:18px 20px;">
                         <p style="margin:0 0 8px 0;font-size:12px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:#0b4bb8;">
                           Verification code
                         </p>
                         <p style="margin:0;font-size:32px;font-weight:800;letter-spacing:0.24em;color:#081223;">
                           ${escapeHtml(template.code)}
                         </p>
                       </div>`
                    : ""
                }
                ${
                  template.actionUrl
                    ? `<p style="margin:0 0 24px 0;font-size:13px;line-height:1.7;color:#667085;word-break:break-word;">
                         Button not working? Copy and paste this URL into your browser:<br />
                         <a href="${escapeHtml(template.actionUrl)}" style="color:${primaryColor};">${escapeHtml(template.actionUrl)}</a>
                       </p>`
                    : ""
                }
                <div style="height:1px;background-color:#e3e8f2;margin:0 0 24px 0;"></div>
                <p style="margin:0 0 12px 0;font-size:14px;line-height:1.7;color:#475467;">
                  ${escapeHtml(template.footer)}
                </p>
                <p style="margin:0;font-size:13px;line-height:1.7;color:#667085;">
                  Need help? Reply to this email or contact <a href="mailto:${escapeHtml(supportEmail)}" style="color:${primaryColor};text-decoration:none;">${escapeHtml(supportEmail)}</a>.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    template.subject,
    "",
    template.heading,
    template.body,
    template.code ? `Verification code: ${template.code}` : null,
    template.actionUrl ? `Action link: ${template.actionUrl}` : null,
    template.footer,
    `Need help? ${supportEmail}`,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    html,
    subject: template.subject,
    text,
  };
}

async function sendEmail(email: RenderedEmail) {
  const response = await fetch("https://api.resend.com/emails", {
    body: JSON.stringify({
      from: `${fromName} <${fromEmail}>`,
      html: email.html,
      reply_to: supportEmail,
      subject: email.subject,
      text: email.text,
      to: [email.to],
    }),
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`Resend send failed: ${await response.text()}`);
  }
}

function buildConfirmUrl({
  appUrl,
  nextPath,
  tokenHash,
  type,
}: {
  appUrl: string;
  nextPath: string;
  tokenHash: string;
  type: EmailActionType;
}) {
  const url = new URL("/auth/confirm", appUrl);
  url.searchParams.set("token_hash", tokenHash);
  url.searchParams.set("type", type);
  url.searchParams.set("next", nextPath);

  return url.toString();
}

function resolveAppUrl(emailData: HookPayload["email_data"]) {
  const configuredAppUrl = Deno.env.get("AUTH_EMAIL_APP_URL");

  if (configuredAppUrl) {
    return resolveBaseUrl(configuredAppUrl);
  }

  if (emailData.redirect_to) {
    try {
      const redirectUrl = new URL(emailData.redirect_to);
      return resolveBaseUrl(redirectUrl.origin);
    } catch {
      // Ignore invalid redirect_to and keep checking fallbacks.
    }
  }

  if (emailData.site_url) {
    return resolveBaseUrl(emailData.site_url);
  }

  return "https://politiviral.com";
}

function resolveNextPath(redirectTo: string | undefined, actionType: EmailActionType) {
  const fallback =
    actionType === "signup" || actionType === "invite"
      ? "/signup?step=role"
      : actionType === "recovery"
        ? "/reset-password?mode=update"
        : "/dashboard";

  if (!redirectTo) {
    return fallback;
  }

  try {
    const redirectUrl = new URL(redirectTo);
    const nestedNextPath = redirectUrl.searchParams.get("next");

    if (nestedNextPath && isSafePath(nestedNextPath)) {
      return nestedNextPath;
    }

    const combinedPath = `${redirectUrl.pathname}${redirectUrl.search}`;
    return isSafePath(combinedPath) ? combinedPath : fallback;
  } catch {
    return isSafePath(redirectTo) ? redirectTo : fallback;
  }
}

function getRecipientName(user: HookPayload["user"]) {
  const fullName = user.user_metadata?.full_name;

  if (typeof fullName === "string" && fullName.trim().length > 0) {
    return fullName.trim();
  }

  return null;
}

function greeting(recipientName: string | null) {
  return recipientName ? `Hi ${recipientName},` : "Hi there,";
}

function isSafePath(value: string) {
  return value.startsWith("/") && !value.startsWith("//");
}

function resolveBaseUrl(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getRequiredEnv(name: string) {
  const value = Deno.env.get(name);

  if (!value) {
    throw new Error(`${name} is not set.`);
  }

  return value;
}

function jsonResponse(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    headers: {
      "Content-Type": "application/json",
    },
    status,
  });
}
