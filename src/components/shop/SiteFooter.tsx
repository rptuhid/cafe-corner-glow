import { Link } from "@tanstack/react-router";
import { shop } from "@/data/shop";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink px-4 py-10 text-center">
      <p className="text-sm text-white/70">
        © {shop.year}{" "}
        <Link to="/" className="font-semibold text-brand-accent">
          {shop.nameEn}
        </Link>{" "}
        · হারবাং বাজার, চকরিয়া, Cox&apos;s Bazar · Proprietor: {shop.proprietor}
      </p>
      <p className="mt-2 text-xs text-white/45">
        সমাজের জন্য বিশ্বস্ত ডিজিটাল সেবা · সর্বস্বত্ব সংরক্ষিত
      </p>
    </footer>
  );
}
