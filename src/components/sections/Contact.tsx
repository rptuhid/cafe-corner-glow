import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { gmailUrl, mapsUrl, shop, whatsappUrl } from "@/data/shop";
import { SectionHeading } from "@/components/shop/SectionHeading";

export function Contact() {
  return (
    <section id="contact" className="bg-brand-soft px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          center
          badge={
            <>
              <MapPin className="h-3.5 w-3.5" /> যোগাযোগ
            </>
          }
          title="আমাদের"
          highlight="দোকানে আসুন"
          sub="হারবাং বাজারের প্রাণকেন্দ্রে — সহজে খুঁজে পাওয়া যায়, সবসময় আপনাকে সাহায্য করতে প্রস্তুত।"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-elegant transition-transform hover:-translate-y-0.5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display font-bold text-ink">ঠিকানা</span>
                <span className="mt-1 block text-sm text-muted-foreground">{shop.addressBn}</span>
              </span>
            </a>

            <a
              href={`tel:+${shop.whatsapp}`}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-elegant transition-transform hover:-translate-y-0.5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display font-bold text-ink">ফোন ও হোয়াটসঅ্যাপ</span>
                <span className="mt-1 block text-sm text-muted-foreground">{shop.phoneBn}</span>
              </span>
            </a>

            <a
              href={gmailUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-elegant transition-transform hover:-translate-y-0.5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display font-bold text-ink">ইমেইল (Gmail)</span>
                <span className="mt-1 block text-sm break-all text-muted-foreground">
                  {shop.email}
                </span>
              </span>
            </a>

            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-elegant">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display font-bold text-ink">খোলার সময়</span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {shop.daysBn} · {shop.hoursBn}
                </span>
              </span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-6 py-4 font-display font-bold text-white shadow-hover transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" /> হোয়াটসঅ্যাপে বার্তা পাঠান
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
            <iframe
              title="Digital Computer & Cyber Cafe — Harbang Bazar মানচিত্র"
              src={`https://www.google.com/maps?q=${shop.mapsQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[420px] w-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
