import { useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LayoutDashboard, Loader2, LogOut, Menu, ShieldAlert, X } from "lucide-react";
import logo from "@/assets/shop-logo.jpg.asset.json";
import { supabase } from "@/integrations/supabase/client";
import { canAccess, modulesForRole, roleLabel } from "@/data/dashboard";
import { useRole } from "@/hooks/useRole";
import { ModuleIcon } from "./ModuleIcon";
import { shop } from "@/data/shop";

export function DashboardShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { role } = useRole();
  const visibleModules = modulesForRole(role);
  const isClient = role === "client";

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  }


  const nav = (
    <nav className="space-y-1">
      <Link
        to="/dashboard"
        onClick={() => setOpen(false)}
        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
          pathname === "/dashboard"
            ? "bg-primary text-primary-foreground"
            : "text-white/70 hover:bg-white/8 hover:text-white"
        }`}
      >
        <LayoutDashboard className="h-4 w-4" /> ড্যাশবোর্ড
      </Link>
      {modules.map((m) => (
        <Link
          key={m.id}
          to={m.to}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
            pathname === m.to
              ? "bg-primary text-primary-foreground"
              : "text-white/70 hover:bg-white/8 hover:text-white"
          }`}
        >
          <ModuleIcon name={m.icon} className="h-4 w-4 shrink-0" />
          <span className="truncate">{m.titleBn}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-ink">
      <div className="mx-auto flex max-w-7xl">
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-white/10 p-5 lg:flex">
          <Link to="/" className="mb-7 flex items-center gap-3">
            <img
              src={logo.url}
              alt={`${shop.nameEn} লোগো`}
              className="h-10 w-10 rounded-xl object-cover"
              width={40}
              height={40}
            />
            <span className="font-display text-sm font-bold text-white">{shop.nameBn}</span>
          </Link>
          {nav}
          <button
            onClick={handleSignOut}
            className="mt-auto flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/60 transition-colors hover:bg-white/8 hover:text-white"
          >
            <LogOut className="h-4 w-4" /> লগআউট
          </button>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-4 lg:px-8">
            <div className="min-w-0">
              <h1 className="truncate font-display text-xl font-extrabold text-white">{title}</h1>
              {subtitle ? <p className="mt-1 text-sm text-white/55">{subtitle}</p> : null}
            </div>
            <button
              className="rounded-xl border border-white/15 p-2 text-white lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="মেনু"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </header>

          {open ? (
            <div className="border-b border-white/10 p-4 lg:hidden">
              {nav}
              <button
                onClick={handleSignOut}
                className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/60 hover:text-white"
              >
                <LogOut className="h-4 w-4" /> লগআউট
              </button>
            </div>
          ) : null}

          <main className="px-4 py-7 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

export function ModulePlaceholder({ note }: { note: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-8 text-center">
      <p className="text-sm text-white/65">{note}</p>
      <p className="mt-2 text-xs text-white/40">
        এই মডিউলের বিস্তারিত কার্যকারিতা পরবর্তী ধাপে যুক্ত হবে।
      </p>
    </div>
  );
}
