import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell, ModulePlaceholder } from "@/components/dashboard/DashboardShell";

const title = "পেয়েবল ও রিসিভেবল | ড্যাশবোর্ড";
const description = "বাকি, পাওনা ও দেনার হিসাব এখান থেকে পরিচালনা করা হবে।";

export const Route = createFileRoute("/_authenticated/dashboard/accounts")({
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
    <DashboardShell title={"পেয়েবল ও রিসিভেবল"} subtitle={"Accounts: Payable & Receivable"} moduleId={"accounts"}>
      <ModulePlaceholder note={"বাকি, পাওনা ও দেনার হিসাব এখান থেকে পরিচালনা করা হবে।"} />
    </DashboardShell>
  );
}
