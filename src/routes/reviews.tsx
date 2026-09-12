import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/shop/PageShell";
import { Reviews } from "@/components/sections/Reviews";

const title = "গ্রাহক রিভিউ | ডিজিটাল কম্পিউটার ও সাইবার ক্যাফে";
const description =
  "হারবাং বাজার ও চকরিয়ার গ্রাহকদের অভিজ্ঞতা ও রেটিং — ই-পাসপোর্ট, এনআইডি ও ভিসা সেবা নিয়ে মতামত।";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <PageShell>
      <PageHero title="গ্রাহকদের রিভিউ" sub="আমাদের সেবা নিয়ে গ্রাহকদের সরাসরি মতামত।" />
      <Reviews />
    </PageShell>
  );
}
