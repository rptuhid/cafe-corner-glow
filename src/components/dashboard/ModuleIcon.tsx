import {
  Banknote,
  CalculatorIcon,
  Camera,
  FileText,
  Settings,
  Users,
  Wallet,
} from "lucide-react";
import type { ModuleIcon as IconKey } from "@/data/dashboard";

const map = {
  content: FileText,
  clients: Users,
  studio: Camera,
  accounts: Wallet,
  hr: Users,
  closing: Banknote,
  settings: Settings,
} as const satisfies Record<IconKey, typeof CalculatorIcon>;

export function ModuleIcon({ name, className }: { name: IconKey; className?: string }) {
  const Icon = map[name];
  return <Icon className={className} />;
}
