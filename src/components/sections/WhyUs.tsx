import { Award, Heart, ShieldCheck, Zap } from "lucide-react";
import { whyUs } from "@/data/shop";
import { SectionHeading } from "@/components/shop/SectionHeading";

const icons = { bolt: Zap, shield: ShieldCheck, heart: Heart } as const;

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-ink px-4 py-20 sm:px-6">
      <div className="absolute inset-0 grid-lines opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          center
          dark
          badge={
            <>
              <Award className="h-3.5 w-3.5" /> কেন আমরা
            </>
          }
          title="আমাদের বেছে নেওয়ার"
          highlight="কারণ"
          sub="হাজারো পরিবার আমাদের উপর আস্থা রাখে — কারণ আমরা প্রতিশ্রুতি রক্ষা করি।"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {whyUs.map((w) => {
            const Icon = icons[w.icon];
            return (
              <article
                key={w.title}
                className="rounded-2xl border border-white/10 bg-white/6 p-7 backdrop-blur-md transition-transform hover:-translate-y-1"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-accent/15 text-brand-accent">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-white">{w.title}</h3>
                <p className="mt-3 text-sm text-white/65">{w.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
