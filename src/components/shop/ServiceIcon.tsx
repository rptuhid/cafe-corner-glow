import {
  Baby,
  BookUser,
  Briefcase,
  FileText,
  IdCard,
  MapPinned,
  Plane,
  Printer,
} from "lucide-react";
import type { IconName } from "@/data/shop";

const map = {
  passport: BookUser,
  id: IdCard,
  baby: Baby,
  briefcase: Briefcase,
  plane: Plane,
  printer: Printer,
  map: MapPinned,
  file: FileText,
} as const;

export const toneClasses: Record<string, string> = {
  sky: "bg-sky-100 text-sky-700",
  green: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  violet: "bg-violet-100 text-violet-700",
  cyan: "bg-cyan-100 text-cyan-700",
  red: "bg-rose-100 text-rose-700",
  emerald: "bg-green-100 text-green-700",
};

export function ServiceIcon({ name, className }: { name: IconName; className?: string }) {
  const Cmp = map[name];
  return <Cmp className={className} aria-hidden="true" />;
}
