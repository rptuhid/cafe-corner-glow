import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/shop/PageShell";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Pricing } from "@/components/sections/Pricing";
import { Reviews } from "@/components/sections/Reviews";
import { WhyUs } from "@/components/sections/WhyUs";
import { Contact } from "@/components/sections/Contact";

const title = "ডিজিটাল কম্পিউটার ও সাইবার ক্যাফে | হারবাং বাজার, চকরিয়া";
const description =
  "ই-পাসপোর্ট, এনআইডি সংশোধন, জন্ম নিবন্ধন, ভিসা প্রসেসিং, চাকরির আবেদন ও প্রিন্টিং সেবা — হারবাং বাজার, চকরিয়া, কক্সবাজার।";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <PageShell>
      <Hero />
      <Services />
      <About />
      <Pricing />
      <Reviews />
      <WhyUs />
      <Contact />
    </PageShell>
  );
}
