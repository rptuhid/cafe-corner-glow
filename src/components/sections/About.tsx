import { Clock, Headset, MapPin, ShieldCheck, Star, Users, Wallet, Zap } from "lucide-react";
import logo from "@/assets/shop-logo.jpg.asset.json";
import { aboutFeatures, shop } from "@/data/shop";
import { SectionHeading } from "@/components/shop/SectionHeading";

const featIcons = { bolt: Zap, shield: ShieldCheck, wallet: Wallet, headset: Headset } as const;

export function About() {
  return (
    <section id="about" className="bg-secondary px-4 py-16 sm:px-6">
      <div className="mx-auto grid max-w-[1200px] items-center gap-8 lg:grid-cols-2">
        <div className="relative">
          <div className="rounded-lg border border-border bg-card p-8 shadow-elegant">
            <img
              src={logo.url}
              alt={`${shop.nameEn} লোগো`}
              className="h-20 w-20 rounded-lg object-cover"
              width={80}
              height={80}
            />
            <h3 className="mt-6 font-display text-2xl font-extrabold text-ink">
              {shop.proprietor}
            </h3>
            <p className="mt-1 text-sm font-medium text-primary">{shop.role}</p>
            <p className="mt-4 text-sm text-muted-foreground">{shop.bio}</p>

            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3 text-sm text-ink">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>হারবাং বাজার, চকরিয়া, Cox&apos;s Bazar</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-ink">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>সপ্তাহে ৭ দিন — সকাল ৯টা থেকে রাত ৯টা</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-ink">
                <Star className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>৫০০০+ গ্রাহকের বিশ্বাস অর্জিত</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-background p-5 text-center">
              <div className="font-display text-2xl font-extrabold text-foreground">10+</div>
              <div className="mt-1 text-xs text-muted-foreground">বছরের অভিজ্ঞতা</div>
            </div>
            <div className="rounded-lg bg-primary p-5 text-center">
              <div className="font-display text-2xl font-extrabold text-primary-foreground">7</div>
              <div className="mt-1 text-xs text-primary-foreground/75">বিশেষজ্ঞ সেবা</div>
            </div>
          </div>
        </div>

        <div>
          <SectionHeading
            badge={
              <>
                <Users className="h-3.5 w-3.5" /> আমাদের সম্পর্কে
              </>
            }
            title="গর্বের সাথে"
            highlight="সমাজের সেবায়"
            sub="Digital Computer & Cyber Cafe was established with one clear goal: make government digital services accessible, fast, and stress-free for every resident of Harbang Bazar and Chakaria."
          />
          <p className="mt-4 text-muted-foreground">
            We understand the paperwork struggles that families face. That&apos;s why we provide
            end-to-end guidance — from initial documentation to final submission — ensuring nothing
            is missed.
          </p>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {aboutFeatures.map((f) => {
              const Icon = featIcons[f.icon];
              return (
                <div
                  key={f.title}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-display text-sm font-bold text-ink">{f.title}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{f.sub}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
