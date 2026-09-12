import { Link } from "@tanstack/react-router";
import { LayoutGrid, MessageCircle, ShieldCheck } from "lucide-react";
import { heroStats, services, whatsappUrl } from "@/data/shop";
import { ServiceIcon } from "@/components/shop/ServiceIcon";

const floatCards = [
  { id: "epassport", status: "✓ এখনই উপলব্ধ", title: "ই-পাসপোর্ট", icon: "passport" },
  { id: "nid", status: "✓ দ্রুত প্রক্রিয়া", title: "এনআইডি সেবা", icon: "id" },
  { id: "visa", status: "✓ অনলাইন সহায়তা", title: "ভিসা প্রসেসিং", icon: "plane" },
  { id: "birth", status: "✓ Quick & Easy", title: "জন্ম নিবন্ধন", icon: "baby" },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 40%, color-mix(in oklab, var(--brand) 30%, transparent) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 10% 80%, color-mix(in oklab, var(--brand-accent) 20%, transparent) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 grid-lines" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-accent uppercase">
            <ShieldCheck className="h-3.5 w-3.5" /> Trusted &amp; Certified Services
          </span>

          <h1 className="mt-6 text-4xl leading-[1.15] font-extrabold text-white sm:text-5xl">
            আপনার সকল
            <br />
            <span className="brand-gradient-text">ডিজিটাল সমাধানের</span> বিশ্বস্ত অংশীদার
          </h1>

          <p className="mt-6 max-w-xl text-white/65">
            ই-পাসপোর্ট, এনআইডি আবেদন, জন্ম নিবন্ধন, ভিসা প্রসেসিং এবং আরও অনেক সেবা — দ্রুত, নিরাপদ
            ও পেশাদারভাবে হারবাং বাজার, চকরিয়ায়।
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-whatsapp px-6 py-3 font-display font-bold text-white shadow-hover transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" /> এখনই হোয়াটসঅ্যাপ করুন
            </a>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:border-brand-accent hover:text-brand-accent"
            >
              <LayoutGrid className="h-5 w-5" /> View Services
            </Link>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {heroStats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-extrabold text-white sm:text-3xl">
                    {s.num}
                  </span>
                  <span className="mt-1 block text-xs text-white/55">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {floatCards.map((c, i) => {
            const svc = services.find((s) => s.id === c.id);
            return (
              <div
                key={c.id}
                className={`flex items-center gap-4 rounded-2xl border border-white/10 bg-white/6 p-5 backdrop-blur-md ${
                  i % 2 === 1 ? "sm:translate-y-6" : ""
                }`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-accent/15 text-brand-accent">
                  <ServiceIcon name={c.icon} className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-sm font-bold text-white">
                    {svc ? svc.title.split(" ")[0] : c.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-whatsapp">{c.status}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
