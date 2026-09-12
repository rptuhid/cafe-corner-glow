import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/shop/PageShell";
import { Contact } from "@/components/sections/Contact";

const title = "যোগাযোগ | ডিজিটাল কম্পিউটার ও সাইবার ক্যাফে";
const description =
  "হারবাং বাজার, চকরিয়া, কক্সবাজার — ফোন, হোয়াটসঅ্যাপ, Gmail ও মানচিত্রে আমাদের অবস্থান ও খোলার সময়।";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <PageHero title="যোগাযোগ করুন" sub="যেকোনো সেবার জন্য সরাসরি আমাদের সাথে কথা বলুন।" />
      <Contact />
    </PageShell>
  );
}
