export type AppRole = "admin" | "executive" | "staff" | "client";

export type ModuleItem = {
  id: string;
  to: string;
  titleBn: string;
  titleEn: string;
  desc: string;
  icon: ModuleIcon;
  tone: string;
  soon?: boolean;
  roles: AppRole[];
};

export const roleLabel: Record<AppRole, string> = {
  admin: "অ্যাডমিন",
  executive: "এক্সিকিউটিভ",
  staff: "স্টাফ",
  client: "ক্লায়েন্ট",
};

export function modulesForRole(role: AppRole | null): ModuleItem[] {
  if (!role) return [];
  return modules.filter((m) => m.roles.includes(role));
}

export function canAccess(role: AppRole | null, moduleId: string): boolean {
  if (!role) return false;
  return modules.some((m) => m.id === moduleId && m.roles.includes(role));
}

export type ModuleIcon =
  | "content"
  | "clients"
  | "studio"
  | "accounts"
  | "hr"
  | "closing"
  | "settings";

export const modules: ModuleItem[] = [
  {
    id: "content",
    to: "/dashboard/content",
    titleBn: "কন্টেন্ট ম্যানেজমেন্ট",
    titleEn: "Content Management",
    desc: "ওয়েবসাইটের সেবা, দাম, রিভিউ ও পেজের কন্টেন্ট পরিচালনা।",
    icon: "content",
    tone: "sky",
  },
  {
    id: "clients",
    to: "/dashboard/clients",
    titleBn: "ক্লায়েন্ট ম্যানেজমেন্ট",
    titleEn: "Client Management",
    desc: "ক্লায়েন্ট প্রোফাইল, সেশন ও কাজের ইতিহাস দেখুন।",
    icon: "clients",
    tone: "green",
  },
  {
    id: "studio",
    to: "/dashboard/studio",
    titleBn: "স্টুডিও অপারেশনস",
    titleEn: "Studio Operations",
    desc: "ছবি এডিটিং, প্রিন্ট ও স্টুডিও সংশ্লিষ্ট কাজ (ভবিষ্যৎ আপডেট)।",
    icon: "studio",
    tone: "violet",
    soon: true,
  },
  {
    id: "accounts",
    to: "/dashboard/accounts",
    titleBn: "পেয়েবল ও রিসিভেবল",
    titleEn: "Accounts: Payable & Receivable",
    desc: "বাকি, পাওনা ও দেনার হিসাব পরিচালনা।",
    icon: "accounts",
    tone: "amber",
  },
  {
    id: "hr",
    to: "/dashboard/hr",
    titleBn: "এইচআর ও পে-রোল",
    titleEn: "HR & Payroll Management",
    desc: "কর্মী তালিকা, হাজিরা ও বেতন ব্যবস্থাপনা।",
    icon: "hr",
    tone: "cyan",
  },
  {
    id: "closing",
    to: "/dashboard/closing",
    titleBn: "দৈনিক ব্যাংক ও ক্যাশ ক্লোজিং",
    titleEn: "Daily Bank & Cash Closing Entry",
    desc: "প্রতিদিনের ক্যাশ ও ব্যাংক ক্লোজিং এন্ট্রি।",
    icon: "closing",
    tone: "emerald",
  },
  {
    id: "settings",
    to: "/dashboard/settings",
    titleBn: "অ্যাকাউন্ট সেটিংস ও ফাইন্যান্সিয়ালস",
    titleEn: "Account Settings & Financials",
    desc: "ক্লোজিং ব্যালেন্স, স্টক, লাইবিলিটিস ও নেট ওয়ার্থ সমন্বয়।",
    icon: "settings",
    tone: "red",
  },
];

export const toneClass: Record<string, string> = {
  sky: "bg-sky-500/15 text-sky-300",
  green: "bg-green-500/15 text-green-300",
  violet: "bg-violet-500/15 text-violet-300",
  amber: "bg-amber-500/15 text-amber-300",
  cyan: "bg-cyan-500/15 text-cyan-300",
  emerald: "bg-emerald-500/15 text-emerald-300",
  red: "bg-red-500/15 text-red-300",
};
