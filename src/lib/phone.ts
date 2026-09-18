// Bangladeshi mobile helpers. Mobile numbers are the primary login identity;
// they are mapped to a stable internal auth email so password login works.

export function normalizeBdPhone(input: string): string | null {
  const digits = input.replace(/[^\d]/g, "");
  let local = digits;
  if (local.startsWith("880")) local = local.slice(3);
  else if (local.startsWith("0")) local = local.slice(1);
  if (!/^1[3-9]\d{8}$/.test(local)) return null;
  return `880${local}`;
}

export function formatBdPhone(phone?: string | null): string {
  if (!phone) return "—";
  const n = normalizeBdPhone(phone);
  if (!n) return phone;
  return `+${n}`;
}

export function phoneToAuthEmail(phone: string): string {
  return `m${phone}@mobile.dccc.app`;
}
