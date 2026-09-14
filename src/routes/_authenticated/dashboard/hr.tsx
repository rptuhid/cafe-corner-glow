import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell, ModulePlaceholder } from "@/components/dashboard/DashboardShell";

const title = "এইচআর ও পে-রোল | ড্যাশবোর্ড";
const description = "কর্মী তালিকা, হাজিরা ও বেতন ব্যবস্থাপনা এখানে থাকবে।";

export const Route = createFileRoute("/_authenticated/dashboard/hr")({
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
  return (
    <DashboardShell title={"এইচআর ও পে-রোল"} subtitle={"HR & Payroll Management"}>
      <ModulePlaceholder note={"কর্মী তালিকা, হাজিরা ও বেতন ব্যবস্থাপনা এখানে থাকবে।"} />
    </DashboardShell>
  );
}
