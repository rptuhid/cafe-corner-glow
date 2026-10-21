import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { LayoutDashboard, LogIn, Menu, MessageCircle, X } from "lucide-react";
import logo from "@/assets/shop-logo.jpg.asset.json";
import { shop, whatsappUrl } from "@/data/shop";
import { useSession } from "@/hooks/useSession";

const links = [
  { to: "/services", label: "সেবাসমূহ" },
  { to: "/pricing", label: "মূল্য তালিকা" },
  { to: "/reviews", label: "রিভিউ" },
  { to: "/about", label: "আমাদের সম্পর্কে" },
  { to: "/contact", label: "যোগাযোগ" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { session } = useSession();
  const authLink = session
    ? ({ to: "/dashboard", label: "ড্যাশবোর্ড", Icon: LayoutDashboard } as const)
    : ({ to: "/login", label: "লগইন", Icon: LogIn } as const);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 ">
      <nav className="mx-auto flex h-17 max-w-[1200px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={logo.url}
            alt="Digital Computer & Cyber Cafe লোগো"
            className="h-11 w-11 rounded object-cover"
            width={44}
            height={44}
          />
          <span className="font-display text-sm leading-tight font-bold text-foreground">
            {shop.nameBn}
            <br />
            <span className="text-primary">& Cyber Cafe</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to={authLink.to}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-brand-accent hover:text-primary"
          >
            <authLink.Icon className="h-4 w-4" /> {authLink.label}
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="মেনু"
          aria-expanded={open}
          className="rounded-lg p-2 text-foreground lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background px-4 pb-5 lg:hidden">
          <ul className="flex flex-col py-2">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-sm font-medium text-muted-foreground"
                  activeProps={{ className: "text-primary" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <Link
              to={authLink.to}
              onClick={() => setOpen(false)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground"
            >
              <authLink.Icon className="h-4 w-4" /> {authLink.label}
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
