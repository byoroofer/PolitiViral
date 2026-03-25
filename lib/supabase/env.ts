const publicKeyEnvNames = [
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const;

function normalizeEnvValue(value: string | null | undefined) {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().replace(/^['"]+|['"]+$/g, "");
  return normalized.length > 0 ? normalized : null;
}

function getRequiredEnv(name: "NEXT_PUBLIC_SUPABASE_URL") {
  const value = normalizeEnvValue(process.env[name]);

  if (!value) {
    throw new Error(`${name} is not set.`);
  }

  return value;
}

function getOptionalPublicKey() {
  for (const envName of publicKeyEnvNames) {
    const value = normalizeEnvValue(process.env[envName]);

    if (value) {
      return value;
    }
  }

  return null;
}

export function hasSupabaseEnv() {
  return Boolean(normalizeEnvValue(process.env.NEXT_PUBLIC_SUPABASE_URL) && getOptionalPublicKey());
}

export function hasSupabaseAdminEnv() {
  return Boolean(
    normalizeEnvValue(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      normalizeEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY),
  );
}

export function getSupabaseUrl() {
  return getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL");
}

export function getSupabasePublicKey() {
  const value = getOptionalPublicKey();

  if (!value) {
    throw new Error(
      "Set NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, or NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  return value;
}

export function getSupabaseServiceRoleKey() {
  const value = normalizeEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!value) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set.");
  }

  return value;
}
