import { redirect } from "next/navigation";

import { getSignedInDestination } from "@/lib/auth/navigation";
import { requireUserContext } from "@/lib/data/user-context";

export default async function DashboardPage() {
  const context = await requireUserContext();
  redirect(getSignedInDestination(context.profile));
}
