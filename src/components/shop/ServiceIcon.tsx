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
  sky: "bg-secondary text-primary",
  green: "bg-secondary text-primary",
  amber: "bg-secondary text-primary",
  violet: "bg-secondary text-primary",
  cyan: "bg-secondary text-primary",
  red: "bg-secondary text-primary",
  emerald: "bg-secondary text-primary",
};

export function ServiceIcon({ name, className }: { name: IconName; className?: string }) {
  const Cmp = map[name];
  return <Cmp className={className} aria-hidden="true" />;
}
