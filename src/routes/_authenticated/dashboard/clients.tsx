import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell, ModulePlaceholder } from "@/components/dashboard/DashboardShell";

const title = "ক্লায়েন্ট ম্যানেজমেন্ট | ড্যাশবোর্ড";
const description = "ক্লায়েন্ট প্রোফাইল, সেশন ও কাজের ইতিহাস এখানে দেখা যাবে।";

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
  return (
    <DashboardShell title={"ক্লায়েন্ট ম্যানেজমেন্ট"} subtitle={"Client Management"}>
      <ModulePlaceholder note={"ক্লায়েন্ট প্রোফাইল, সেশন ও কাজের ইতিহাস এখানে দেখা যাবে।"} />
    </DashboardShell>
  );
}
