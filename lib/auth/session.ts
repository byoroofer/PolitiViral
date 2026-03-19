import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export async function getOptionalUser(): Promise<User | null> {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function requireUser(redirectPath = "/login"): Promise<User> {
  const user = await getOptionalUser();

  if (!user) {
    redirect(redirectPath);
  }

  return user;
}
