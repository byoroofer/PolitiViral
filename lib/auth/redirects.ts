const defaultRedirectPath = "/dashboard";
const defaultInviteRedirectPath = "/signup?step=role";

type AuthPagePathname = "/login" | "/signup" | "/reset-password";
type ResetPasswordMode = "request" | "update";

function buildRelativeHref(
  pathname: AuthPagePathname,
  params: Record<string, string | null>,
) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${pathname}?${queryString}` : pathname;
}

export function getSafeRedirectPath(
  redirectPath: string | null | undefined,
  fallback = defaultRedirectPath,
) {
  if (!redirectPath || !redirectPath.startsWith("/") || redirectPath.startsWith("//")) {
    return fallback;
  }

  return redirectPath;
}

export function normalizeRedirectTargetFromUrl(
  redirectTarget: string | null | undefined,
  fallback = defaultRedirectPath,
) {
  if (!redirectTarget) {
    return fallback;
  }

  try {
    const url = new URL(redirectTarget);
    const nestedNextPath = url.searchParams.get("next");

    if (nestedNextPath) {
      return getSafeRedirectPath(nestedNextPath, fallback);
    }

    const combinedPath = `${url.pathname}${url.search}`;
    return getSafeRedirectPath(combinedPath, fallback);
  } catch {
    return getSafeRedirectPath(redirectTarget, fallback);
  }
}

export function buildAuthCallbackUrl(origin: string, redirectPath: string) {
  const callbackUrl = new URL("/auth/callback", origin);
  callbackUrl.searchParams.set("next", getSafeRedirectPath(redirectPath));

  return callbackUrl.toString();
}

export function buildResetPasswordUrl(origin: string) {
  const resetUrl = new URL("/reset-password", origin);
  resetUrl.searchParams.set("mode", "update");

  return resetUrl.toString();
}

export function buildAuthPageHref(
  pathname: "/login" | "/signup",
  redirectPath: string,
) {
  const safeRedirectPath = getSafeRedirectPath(redirectPath);

  if (safeRedirectPath === defaultRedirectPath) {
    return pathname;
  }

  return buildRelativeHref(pathname, { redirectedFrom: safeRedirectPath });
}

export function buildLoginErrorHref(errorMessage: string, redirectPath: string) {
  const safeRedirectPath = getSafeRedirectPath(redirectPath);

  return buildRelativeHref("/login", {
    error: errorMessage,
    redirectedFrom: safeRedirectPath !== defaultRedirectPath ? safeRedirectPath : null,
  });
}

export function buildLoginStatusHref(
  statusMessage: string,
  redirectPath = defaultRedirectPath,
) {
  const safeRedirectPath = getSafeRedirectPath(redirectPath);

  return buildRelativeHref("/login", {
    redirectedFrom: safeRedirectPath !== defaultRedirectPath ? safeRedirectPath : null,
    status: statusMessage,
  });
}

export function buildResetPasswordPageHref({
  errorMessage,
  mode = "request",
  statusMessage,
}: {
  errorMessage?: string | null;
  mode?: ResetPasswordMode;
  statusMessage?: string | null;
} = {}) {
  return buildRelativeHref("/reset-password", {
    error: errorMessage ?? null,
    mode: mode !== "request" ? mode : null,
    status: statusMessage ?? null,
  });
}

export function getDefaultNextPathForEmailAction(type: string | null | undefined) {
  if (type === "invite" || type === "signup") {
    return defaultInviteRedirectPath;
  }

  if (type === "recovery") {
    return buildResetPasswordPageHref({ mode: "update" });
  }

  return defaultRedirectPath;
}
