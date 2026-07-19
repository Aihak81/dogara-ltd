import { createServerSupabaseClient } from "@/lib/supabase/server";
import { DashboardShell } from "../dashboard-shell";
import { QuotesClient } from "./quotes-client";

export default async function QuotesPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: quotes } = await supabase
    .from("quotes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <DashboardShell
      quotes={quotes ?? []}
      orders={[]}
      notifications={[]}
    >
      <QuotesClient initialQuotes={quotes ?? []} />
    </DashboardShell>
  );
}