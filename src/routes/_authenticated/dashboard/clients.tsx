import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AdminClients } from "@/components/dashboard/AdminClients";
import { ClientPortal } from "@/components/dashboard/ClientPortal";
import { useRole } from "@/hooks/useRole";

const title = "ক্লায়েন্ট ম্যানেজমেন্ট | ড্যাশবোর্ড";
const description = "ক্লায়েন্ট প্রোফাইল, রোল, অর্ডার ও পরিবর্তনের অনুরোধ পরিচালনা।";

export const Route = createFileRoute("/_authenticated/dashboard/clients")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  const { role, loading } = useRole();
  const isClient = role === "client";

  return (
    <DashboardShell
      title={isClient ? "আমার প্রোফাইল" : "ক্লায়েন্ট ম্যানেজমেন্ট"}
      subtitle={isClient ? "My Profile & Orders" : "Client Management"}
      moduleId="clients"
    >
      {loading ? null : isClient ? <ClientPortal /> : <AdminClients />}
    </DashboardShell>
  );
}
