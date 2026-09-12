import { Tags } from "lucide-react";
import { pricing, whatsappUrl } from "@/data/shop";
import { ServiceIcon, toneClasses } from "@/components/shop/ServiceIcon";
import { SectionHeading } from "@/components/shop/SectionHeading";

export function Pricing() {
  return (
    <section id="pricing" className="bg-background px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          center
          badge={
            <>
              <Tags className="h-3.5 w-3.5" /> Pricing
            </>
          }
          title="স্বচ্ছ"
          highlight="সেবার মূল্য"
          sub="আমাদের সবচেয়ে জনপ্রিয় সেবার শুরুর মূল্য। চূড়ান্ত চার্জ জটিলতা ও নথির প্রয়োজনীয়তার উপর নির্ভর করে পরিবর্তিত হতে পারে।"
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {pricing.map((p) => (
            <div
              key={p.id}
              className={`flex items-center gap-4 rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-hover ${
                p.featured
                  ? "border-transparent bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-hover"
                  : "border-border bg-card shadow-elegant"
              }`}
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                  p.featured ? "bg-white/15 text-white" : (toneClasses[p.tone] ?? "")
                }`}
              >
                <ServiceIcon name={p.icon} className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={`block truncate font-display font-bold ${p.featured ? "" : "text-ink"}`}
                >
                  {p.name}
                </span>
                <span
                  className={`mt-0.5 block text-xs ${
                    p.featured ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}
                >
                  {p.service}
                </span>
              </span>
              <span className="text-right">
                <span
                  className={`block text-[0.68rem] ${
                    p.featured ? "text-primary-foreground/75" : "text-muted-foreground"
                  }`}
                >
                  শুরু থেকে
                </span>
                <span className="block font-display text-xl font-extrabold">{p.price}</span>
              </span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          💬 জটিলতার উপর নির্ভর করে মূল্য পরিবর্তন হতে পারে। নির্দিষ্ট সেবার জন্য বিনামূল্যে পরামর্শ
          পেতে{" "}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-primary underline underline-offset-4"
          >
            হোয়াটসঅ্যাপে বার্তা পাঠান
          </a>
          ।
        </p>
      </div>
    </section>
  );
}
