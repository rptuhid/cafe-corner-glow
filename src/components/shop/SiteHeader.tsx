import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { LayoutDashboard, LogIn, Menu, Phone, X } from "lucide-react";
import logo from "@/assets/shop-logo.jpg.asset.json";
import { shop } from "@/data/shop";
import { useSession } from "@/hooks/useSession";
import { Button } from "@/components/ui/button";
const links = [
  { to: "/", label: "হোম", en: "Home" },
  { to: "/services", label: "সেবাসমূহ", en: "Services" },
  { to: "/pricing", label: "মূল্য তালিকা", en: "Fees" },
  { to: "/reviews", label: "রিভিউ", en: "Reviews" },
  { to: "/about", label: "পরিচিতি", en: "About" },
  { to: "/contact", label: "যোগাযোগ", en: "Contact" },
] as const;
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { session } = useSession();
  const authLink = session ? ({ to: "/dashboard", label: "ড্যাশবোর্ড", Icon: LayoutDashboard } as const) : ({ to: "/login", label: "লগইন", Icon: LogIn } as const);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex min-h-8 max-w-[1200px] items-center justify-between gap-3 px-4 text-xs sm:px-6">
          <span className="hidden sm:inline">{shop.daysBn} · {shop.hoursBn}</span>
          <span className="sm:hidden">হারবাং বাজার, চকরিয়া</span>
          <a href={`tel:+${shop.whatsapp}`} className="inline-flex items-center gap-2"><Phone className="h-3 w-3" /> {shop.phoneBn}</a>
        </div>
      </div>
      <nav className="mx-auto flex min-h-22 max-w-[1200px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-3">
          <img src={logo.url} alt={`${shop.nameEn} লোগো`} width={52} height={52} className="h-13 w-13 shrink-0 object-contain" />
          <span className="font-display text-sm font-semibold text-primary">{shop.nameBn}<span className="mt-1 block font-sans text-xs text-muted-foreground">&amp; Cyber Cafe</span></span>
        </Link>
        <ul className="hidden items-center gap-5 lg:flex">
          {links.map(l => <li key={l.to}><Link to={l.to} className="block border-b-2 border-transparent py-2 text-sm text-muted-foreground hover:text-primary" activeProps={{className:"border-primary text-primary"}} activeOptions={{exact: true}}><span className="block">{l.label}</span><span lang="en" className="block text-[11px]">{l.en}</span></Link></li>)}
        </ul>
        <Button variant="outline" asChild className="hidden lg:inline-flex"><Link to={authLink.to}><authLink.Icon /> {authLink.label}</Link></Button>
        <Button variant="ghost" size="icon" onClick={() => setOpen(v => !v)} aria-label={open ? "মেনু বন্ধ করুন" : "মেনু"} aria-expanded={open} className="lg:hidden">{open ? <X /> : <Menu />}</Button>
      </nav>
      {open ? <div className="fixed inset-x-0 top-30 bottom-0 overflow-y-auto border-t border-border bg-card px-6 py-6 lg:hidden"><ul>{links.map(l => <li key={l.to}><Link to={l.to} onClick={() => setOpen(false)} className="flex min-h-14 items-center justify-between border-b border-border text-foreground" activeProps={{className:"text-primary"}} activeOptions={{exact:true}}>{l.label}<span lang="en" className="text-xs text-muted-foreground">{l.en}</span></Link></li>)}</ul><Button asChild className="mt-6 w-full"><Link to={authLink.to} onClick={() => setOpen(false)}><authLink.Icon /> {authLink.label}</Link></Button></div> : null}
    </header>
  );
}
