import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/shop/PageShell";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";

const title = "সেবাসমূহ | ডিজিটাল কম্পিউটার ও সাইবার ক্যাফে";
const description =
  "ই-পাসপোর্ট, এনআইডি, জন্ম নিবন্ধন, চাকরির আবেদন, ভিসা প্রসেসিং, প্রিন্টিং ও জমির খতিয়ান — আমাদের সব সেবার তালিকা।";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        title="আমাদের সেবাসমূহ"
        sub="সরকারি ও ডিজিটাল ডকুমেন্টেশনের সব সেবা এক জায়গায়।"
      />
      <Services />
      <WhyUs />
    </PageShell>
  );
}
