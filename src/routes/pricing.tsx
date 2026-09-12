import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/shop/PageShell";
import { Pricing } from "@/components/sections/Pricing";

const title = "মূল্য তালিকা | ডিজিটাল কম্পিউটার ও সাইবার ক্যাফে";
const description =
  "ই-পাসপোর্ট ৳300 থেকে, এনআইডি সংশোধন ৳200, জন্ম নিবন্ধন ৳150 সহ সব সেবার স্বচ্ছ শুরুর মূল্য।";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <PageShell>
      <PageHero title="মূল্য তালিকা" sub="কোনো লুকানো চার্জ নেই — স্বচ্ছ ও সাশ্রয়ী মূল্য।" />
      <Pricing />
    </PageShell>
  );
}
