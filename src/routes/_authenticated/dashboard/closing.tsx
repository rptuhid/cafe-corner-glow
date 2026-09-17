import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell, ModulePlaceholder } from "@/components/dashboard/DashboardShell";

const title = "দৈনিক ব্যাংক ও ক্যাশ ক্লোজিং | ড্যাশবোর্ড";
const description = "প্রতিদিনের ক্যাশ ও ব্যাংক ক্লোজিং এন্ট্রি এখানে করা হবে।";

export const Route = createFileRoute("/_authenticated/dashboard/closing")({
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
    <DashboardShell title={"দৈনিক ব্যাংক ও ক্যাশ ক্লোজিং"} subtitle={"Daily Bank & Cash Closing Entry"} moduleId={"closing"}>
      <ModulePlaceholder note={"প্রতিদিনের ক্যাশ ও ব্যাংক ক্লোজিং এন্ট্রি এখানে করা হবে।"} />
    </DashboardShell>
  );
}
