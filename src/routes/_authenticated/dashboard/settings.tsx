import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell, ModulePlaceholder } from "@/components/dashboard/DashboardShell";
import { ExecutiveManager } from "@/components/dashboard/ExecutiveManager";

const title = "অ্যাকাউন্ট সেটিংস ও ফাইন্যান্সিয়ালস | ড্যাশবোর্ড";
const description = "ক্লোজিং ব্যালেন্স, স্টক, লাইবিলিটিস ও নেট ওয়ার্থ সমন্বয় এখানে হবে।";

export const Route = createFileRoute("/_authenticated/dashboard/settings")({
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
    <DashboardShell title={"অ্যাকাউন্ট সেটিংস ও ফাইন্যান্সিয়ালস"} subtitle={"Account Settings & Financials"} moduleId={"settings"}>
      <div className="space-y-6">
        <ExecutiveManager />
        <ModulePlaceholder note={"ক্লোজিং ব্যালেন্স, স্টক, লাইবিলিটিস ও নেট ওয়ার্থ সমন্বয় এখানে হবে।"} />
      </div>
    </DashboardShell>
  );
}
