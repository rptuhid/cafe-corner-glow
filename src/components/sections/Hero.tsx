import { Link } from "@tanstack/react-router";
import { LayoutGrid, LogIn, MapPin, Phone } from "lucide-react";
import { shop } from "@/data/shop";
import logo from "@/assets/shop-logo.jpg.asset.json";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="border-b border-border bg-background px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-center gap-3 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> হারবাং বাজার, চকরিয়া · Harbang Bazar</div>
        <div className="mt-8 flex items-start gap-6 sm:gap-8">
          <img src={logo.url} alt={`${shop.nameEn} লোগো`} width={120} height={120} className="hidden h-30 w-30 shrink-0 object-contain sm:block" />
          <div className="min-w-0">
            <h1 className="max-w-3xl text-[28px] font-bold leading-snug sm:text-[40px]">ডিজিটাল কম্পিউটার<br className="sm:hidden" /> ও সাইবার ক্যাফে</h1>
            <p lang="en" className="mt-3 font-display text-base font-semibold text-primary sm:text-xl">Digital Computers &amp; Cyber Cafe</p>
            <p className="mt-5 max-w-2xl text-muted-foreground">ই-পাসপোর্ট, এনআইডি, জন্ম নিবন্ধন ও অনলাইন আবেদন থেকে প্রিন্টিং—আপনার প্রয়োজনীয় নাগরিক ও কম্পিউটার সেবা, এক জায়গায়।</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild><Link to="/services"><LayoutGrid /> সেবাসমূহ / Services</Link></Button>
              <Button asChild variant="outline"><Link to="/login"><LogIn /> লগইন / Login</Link></Button>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-5 text-sm text-muted-foreground">
          <span>{shop.daysBn} · {shop.hoursBn}</span>
          <a href={`tel:+${shop.whatsapp}`} className="inline-flex items-center gap-2 font-semibold text-primary"><Phone className="h-4 w-4" /> {shop.phoneBn}</a>
        </div>
      </div>
    </section>
  );
}
