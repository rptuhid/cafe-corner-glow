import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell, ModulePlaceholder } from "@/components/dashboard/DashboardShell";

const title = "স্টুডিও অপারেশনস | ড্যাশবোর্ড";
const description = "ছবি এডিটিং, প্রিন্ট ও স্টুডিও সংশ্লিষ্ট কাজের জন্য সংরক্ষিত।";

export const Route = createFileRoute("/_authenticated/dashboard/studio")({
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
    <DashboardShell title={"স্টুডিও অপারেশনস"} subtitle={"Studio Operations"} moduleId={"studio"}>
      <ModulePlaceholder note={"ছবি এডিটিং, প্রিন্ট ও স্টুডিও সংশ্লিষ্ট কাজের জন্য সংরক্ষিত।"} />
    </DashboardShell>
  );
}
