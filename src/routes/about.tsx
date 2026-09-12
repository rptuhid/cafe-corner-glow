import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/shop/PageShell";
import { About } from "@/components/sections/About";
import { WhyUs } from "@/components/sections/WhyUs";

const title = "আমাদের সম্পর্কে | ডিজিটাল কম্পিউটার ও সাইবার ক্যাফে";
const description =
  "স্বত্বাধিকারী তুহিদুল ইসলাম পরিচালিত হারবাং বাজারের বিশ্বস্ত ডিজিটাল সেবা কেন্দ্র সম্পর্কে জানুন।";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <PageHero title="আমাদের সম্পর্কে" sub="দোকান ও স্বত্বাধিকারীর পরিচয়।" />
      <About />
      <WhyUs />
    </PageShell>
  );
}
