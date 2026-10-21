import { LayoutGrid } from "lucide-react";
import { services } from "@/data/shop";
import { ServiceIcon } from "@/components/shop/ServiceIcon";
import { SectionHeading } from "@/components/shop/SectionHeading";

export function Services() {
  return (
    <section id="services" className="bg-background px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          center
          badge={
            <>
              <LayoutGrid className="h-3.5 w-3.5" /> আমরা কী করি
            </>
          }
          title="সম্পূর্ণ ডিজিটাল"
          highlight="সেবা কেন্দ্র"
          sub="সরকারি নথিপত্র ও ডিজিটাল সেবার সব কাজ এক ছাদের নিচে — সময়, পরিশ্রম ও অপ্রয়োজনীয় যাতায়াত বাঁচান।"
        />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.id}
              className="group rounded-lg border border-border bg-card p-6 shadow-elegant transition-all  hover:shadow-elegant"
            >
              <span
                className="flex h-6 w-6 items-center justify-center text-primary"
              >
                <ServiceIcon name={s.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
              <span className="mt-5 inline-block rounded bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                {s.tag}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
