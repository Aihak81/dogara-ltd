import { createServerSupabaseClient } from "@/lib/supabase/server";
import { DashboardShell } from "../dashboard-shell";

export default async function CustomersPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  return (
    <DashboardShell
      quotes={[]}
      orders={[]}
      notifications={[]}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customers</h2>
          <p className="text-gray-600 mt-1">
            Manage your customer information
          </p>
        </div>
        <div className="text-center py-12 text-gray-500">
          Customer management coming soon.
        </div>
      </div>
    </DashboardShell>
  );
}