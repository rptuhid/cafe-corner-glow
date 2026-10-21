import { Link } from "@tanstack/react-router";
import { shop } from "@/data/shop";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background px-4 py-10 text-center">
      <p className="text-sm text-muted-foreground">
        © {shop.year}{" "}
        <Link to="/" className="font-semibold text-primary">
          {shop.nameEn}
        </Link>{" "}
        · হারবাং বাজার, চকরিয়া, Cox&apos;s Bazar · Proprietor: {shop.proprietor}
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        সমাজের জন্য বিশ্বস্ত ডিজিটাল সেবা · সর্বস্বত্ব সংরক্ষিত
      </p>
    </footer>
  );
}
