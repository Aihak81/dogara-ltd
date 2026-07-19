import { createServerSupabaseClient } from "@/lib/supabase/server";
import { DashboardShell } from "../dashboard-shell";
import { OrdersClient } from "./orders-client";

export default async function OrdersPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <DashboardShell
      quotes={[]}
      orders={orders ?? []}
      notifications={[]}
    >
      <OrdersClient initialOrders={orders ?? []} />
    </DashboardShell>
  );
}