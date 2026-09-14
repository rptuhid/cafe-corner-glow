import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell, ModulePlaceholder } from "@/components/dashboard/DashboardShell";

const title = "কন্টেন্ট ম্যানেজমেন্ট | ড্যাশবোর্ড";
const description = "ওয়েবসাইটের সেবা, দাম, রিভিউ ও পেজের কন্টেন্ট এখান থেকে পরিচালনা করা হবে।";

export const Route = createFileRoute("/_authenticated/dashboard/content")({
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
    <DashboardShell title={"কন্টেন্ট ম্যানেজমেন্ট"} subtitle={"Content Management"}>
      <ModulePlaceholder note={"ওয়েবসাইটের সেবা, দাম, রিভিউ ও পেজের কন্টেন্ট এখান থেকে পরিচালনা করা হবে।"} />
    </DashboardShell>
  );
}
