import type { Tables } from "@/integrations/supabase/types";

export type Order = Tables<"orders">;

export const statusLabel: Record<string, string> = {
  pending: "অপেক্ষমাণ",
  in_progress: "চলমান",
  completed: "সম্পন্ন",
  cancelled: "বাতিল",
};

export function money(v: number | string | null) {
  const n = Number(v ?? 0);
  return `৳${n.toLocaleString("bn-BD")}`;
}

export function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="text-xs text-muted-foreground">
          <tr className="border-b border-border">
            <th className="py-2 pr-3">তারিখ</th>
            <th className="py-2 pr-3">সেবা</th>
            <th className="py-2 pr-3">মোট</th>
            <th className="py-2 pr-3">অগ্রিম</th>
            <th className="py-2 pr-3">বাকি</th>
            <th className="py-2 pr-3">অগ্রগতি</th>
            <th className="py-2">অবস্থা</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b border-border text-muted-foreground">
              <td className="py-2.5 pr-3 whitespace-nowrap">
                {new Date(o.created_at).toLocaleDateString("bn-BD")}
              </td>
              <td className="py-2.5 pr-3">
                <span className="font-semibold text-foreground">{o.service_title}</span>
                {o.details ? <p className="text-xs text-muted-foreground">{o.details}</p> : null}
              </td>
              <td className="py-2.5 pr-3">{money(o.total_amount)}</td>
              <td className="py-2.5 pr-3">{money(o.advance_amount)}</td>
              <td className="py-2.5 pr-3 font-semibold text-warning">{money(o.due_amount)}</td>
              <td className="py-2.5 pr-3">{o.progress}%</td>
              <td className="py-2.5">
                <span className="rounded border border-border bg-secondary px-2.5 py-1 text-xs">
                  {statusLabel[o.status] ?? o.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
