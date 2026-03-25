function normalizeEnvValue(value: string | null | undefined) {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().replace(/^['"]+|['"]+$/g, "");
  return normalized.length > 0 ? normalized : null;
}

function getOptionalSupabaseUrl() {
  return normalizeEnvValue(process.env.NEXT_PUBLIC_SUPABASE_URL);
}

function getOptionalPublicKey() {
  return (
    normalizeEnvValue(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY) ||
    normalizeEnvValue(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) ||
    normalizeEnvValue(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

export function hasSupabaseEnv() {
  return Boolean(getOptionalSupabaseUrl() && getOptionalPublicKey());
}

export function hasSupabaseAdminEnv() {
  return Boolean(
    getOptionalSupabaseUrl() &&
      normalizeEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY),
  );
}

export function getSupabaseUrl() {
  const value = getOptionalSupabaseUrl();

  if (!value) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set.");
  }

  return value;
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
