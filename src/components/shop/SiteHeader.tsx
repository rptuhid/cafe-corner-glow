import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { LogIn, Menu, MessageCircle, X } from "lucide-react";
import logo from "@/assets/shop-logo.jpg.asset.json";
import { shop, whatsappUrl } from "@/data/shop";

const links = [
  { to: "/services", label: "সেবাসমূহ" },
  { to: "/pricing", label: "মূল্য তালিকা" },
  { to: "/reviews", label: "রিভিউ" },
  { to: "/about", label: "আমাদের সম্পর্কে" },
  { to: "/contact", label: "যোগাযোগ" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-17 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={logo.url}
            alt="Digital Computer & Cyber Cafe লোগো"
            className="h-11 w-11 rounded-full object-cover"
            width={44}
            height={44}
          />
          <span className="font-display text-sm leading-tight font-bold text-white">
            {shop.nameBn}
            <br />
            <span className="text-brand-accent">& Cyber Cafe</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="text-sm font-medium text-white/75 transition-colors hover:text-brand-accent"
                activeProps={{ className: "text-brand-accent" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3.5 py-2 text-sm font-medium text-white/85 transition-colors hover:border-brand-accent hover:text-brand-accent"
          >
            <LogIn className="h-4 w-4" /> লগইন
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
          className="rounded-lg p-2 text-white lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-ink px-4 pb-5 lg:hidden">
          <ul className="flex flex-col py-2">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-sm font-medium text-white/80"
                  activeProps={{ className: "text-brand-accent" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm font-medium text-white"
            >
              <LogIn className="h-4 w-4" /> লগইন
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
