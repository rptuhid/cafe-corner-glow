import { Mail, MessageCircle } from "lucide-react";
import { gmailUrl, whatsappUrl } from "@/data/shop";

export function FloatingContact() {
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3 sm:right-6 sm:bottom-6">
      <a
        href={gmailUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Gmail-এ ইমেইল পাঠান"
        className="flex h-12 w-12 items-center justify-center rounded bg-primary text-primary-foreground shadow-elegant transition-transform "
      >
        <Mail className="h-5 w-5" />
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="হোয়াটসঅ্যাপে বার্তা পাঠান"
        className="flex h-14 w-14 items-center justify-center rounded bg-primary text-foreground shadow-elegant transition-transform "
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
