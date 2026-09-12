export const shop = {
  nameBn: "ডিজিটাল কম্পিউটার",
  nameEn: "Digital Computer & Cyber Cafe",
  metaTitle: "ডিজিটাল কম্পিউটার ও সাইবার ক্যাফে | হারবাং বাজার, চকরিয়া",
  proprietor: "Tuhidul Islam",
  proprietorBn: "তুহিদুল ইসলাম",
  role: "Proprietor — Digital Computer & Cyber Cafe",
  bio: "ডিজিটাল ডকুমেন্টেশন সেবায় বহু বছরের অভিজ্ঞতা নিয়ে তুহিদুল ইসলাম হারবাং বাজার ও আশপাশের এলাকার হাজার হাজার পরিবারকে সরকারি পোর্টাল, পাসপোর্ট আবেদন ও দাপ্তরিক কাগজপত্রে সহায়তা করেছেন — যত্ন, নির্ভুলতা ও গতির সাথে।",
  addressBn: "হারবাং বাজার, চকরিয়া, Cox's Bazar, Bangladesh",
  daysBn: "শনিবার – বৃহস্পতিবার",
  hoursBn: "সকাল ৯:০০ – রাত ৯:০০",
  phoneBn: "+৮৮০ ১৬৯০-০৫২৭৪৩",
  whatsapp: "8801690052743",
  email: "digitalcomputer.harbang@gmail.com",
  mapsQuery: "Harbang+Bazar+Chakaria+Cox's+Bazar",
  year: 2025,
} as const;

export const whatsappUrl = `https://wa.me/${shop.whatsapp}`;
export const mapsUrl = `https://maps.google.com/?q=${shop.mapsQuery}`;
export const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  shop.email,
)}&su=${encodeURIComponent("সেবার জন্য যোগাযোগ — Digital Computer & Cyber Cafe")}`;

export type IconName =
  | "passport"
  | "id"
  | "baby"
  | "briefcase"
  | "plane"
  | "printer"
  | "map"
  | "file";

export type Service = {
  id: string;
  icon: IconName;
  title: string;
  desc: string;
  tag: string;
  tone: string;
};

export const services: Service[] = [
  {
    id: "epassport",
    icon: "passport",
    title: "ই-পাসপোর্ট আবেদন",
    desc: "নতুন ই-পাসপোর্ট আবেদন, নবায়ন ও সংশোধনে সহায়তা করি। ফর্ম পূরণ থেকে অ্যাপয়েন্টমেন্ট নির্ধারণ পর্যন্ত — সম্পূর্ণ সেবা।",
    tag: "সরকারি",
    tone: "sky",
  },
  {
    id: "nid",
    icon: "id",
    title: "NID Correction & Application",
    desc: "জাতীয় পরিচয়পত্র সংশোধন, নতুন আবেদন ও তথ্য হালনাগাদ। সঠিকভাবে জমা দেওয়া নিশ্চিত করি।",
    tag: "পরিচয়",
    tone: "green",
  },
  {
    id: "birth",
    icon: "baby",
    title: "জন্ম নিবন্ধন",
    desc: "নবজাতকের অনলাইন জন্ম নিবন্ধন ও বিদ্যমান সনদ সংশোধন। দ্রুত ও আইনসম্মত প্রক্রিয়া।",
    tag: "নাগরিক রেকর্ড",
    tone: "amber",
  },
  {
    id: "job",
    icon: "briefcase",
    title: "অনলাইন চাকরির আবেদন",
    desc: "সরকারি চাকরির আবেদন (বিডি জবস, টেলিটক অ্যাপ্লাই), ফর্ম পূরণ, প্রবেশপত্র ডাউনলোড ও অনলাইন পরীক্ষার প্রস্তুতি।",
    tag: "ক্যারিয়ার",
    tone: "violet",
  },
  {
    id: "visa",
    icon: "plane",
    title: "ভিসা প্রসেসিং (অনলাইন)",
    desc: "সৌদি আরব, মালয়েশিয়া, আরব আমিরাত সহ বিভিন্ন দেশের ট্যুরিস্ট, ওয়ার্ক ও স্টুডেন্ট ভিসা আবেদন। ফর্ম থেকে জমা পর্যন্ত সম্পূর্ণ সহায়তা।",
    tag: "আন্তর্জাতিক",
    tone: "cyan",
  },
  {
    id: "print",
    icon: "printer",
    title: "Photo & Document Printing",
    desc: "উচ্চমানের পাসপোর্ট সাইজ ছবি প্রিন্ট, ডকুমেন্ট স্ক্যানিং, রঙিন/সাদাকালো প্রিন্ট, ল্যামিনেশন ও ফটোকপি।",
    tag: "প্রিন্ট সেবা",
    tone: "red",
  },
  {
    id: "land",
    icon: "map",
    title: "জমির রেকর্ড (খতিয়ান)",
    desc: "অনলাইনে খতিয়ান (আরএস/সিএস/এসএ/বিআরএস), পর্চা ও মৌজা ম্যাপ সংগ্রহ। দ্রুত ও নির্ভরযোগ্য।",
    tag: "Land & Property",
    tone: "emerald",
  },
];

export type PriceItem = {
  id: string;
  icon: IconName;
  name: string;
  service: string;
  price: string;
  tone: string;
  featured?: boolean;
};

export const pricing: PriceItem[] = [
  {
    id: "epassport",
    icon: "passport",
    name: "ই-পাসপোর্ট আবেদন",
    service: "নতুন / নবায়ন / সংশোধন",
    price: "৳300",
    tone: "sky",
    featured: true,
  },
  {
    id: "nid",
    icon: "id",
    name: "NID Correction",
    service: "নাম / জন্মতারিখ / ঠিকানা সংশোধন",
    price: "৳200",
    tone: "sky",
  },
  {
    id: "birth",
    icon: "baby",
    name: "জন্ম নিবন্ধন",
    service: "নতুন / অনলাইন সংশোধন",
    price: "৳150",
    tone: "amber",
  },
  {
    id: "visa",
    icon: "plane",
    name: "ভিসা প্রসেসিং",
    service: "Saudi, Malaysia, UAE & more",
    price: "৳500",
    tone: "cyan",
  },
  {
    id: "job",
    icon: "briefcase",
    name: "Job Application",
    service: "টেলিটক / বিডি জবস আবেদন",
    price: "৳100",
    tone: "violet",
  },
  {
    id: "photo",
    icon: "printer",
    name: "Photo Printing",
    service: "পাসপোর্ট সাইজ / রঙিন প্রিন্ট",
    price: "৳30",
    tone: "red",
  },
  {
    id: "land",
    icon: "map",
    name: "জমির রেকর্ড (খতিয়ান)",
    service: "আরএস / সিএস / এসএ / বিআরএস পর্চা",
    price: "৳200",
    tone: "emerald",
  },
  {
    id: "scan",
    icon: "file",
    name: "স্ক্যানিং / ফটোকপি",
    service: "Per page / Color or B&W",
    price: "৳10",
    tone: "sky",
  },
];

export type Review = {
  id: string;
  name: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
};

// Placeholder reviews — replace with real customer feedback.
export const reviews: Review[] = [
  {
    id: "r1",
    name: "মোঃ রফিকুল ইসলাম",
    service: "ই-পাসপোর্ট আবেদন",
    rating: 5,
    comment:
      "খুব দ্রুত এবং নির্ভুলভাবে আমার ই-পাসপোর্টের আবেদন করে দিয়েছেন। অ্যাপয়েন্টমেন্টের তারিখও সুবিধামতো নিয়ে দিয়েছেন।",
    date: "২০২৫",
  },
  {
    id: "r2",
    name: "Nasrin Akter",
    service: "NID Correction",
    rating: 5,
    comment:
      "আমার এনআইডিতে নামের ভুল ছিল, অনেক জায়গায় ঘুরেও কাজ হয়নি। এখানে একবারেই সঠিকভাবে আবেদন জমা হয়েছে।",
    date: "২০২৫",
  },
  {
    id: "r3",
    name: "আবদুল করিম",
    service: "জন্ম নিবন্ধন",
    rating: 4,
    comment:
      "বাচ্চার জন্ম নিবন্ধন একই দিনে করে দিয়েছেন। ব্যবহারও অনেক ভালো, সব কিছু বুঝিয়ে বলেন।",
    date: "২০২৫",
  },
  {
    id: "r4",
    name: "Jashim Uddin",
    service: "ভিসা প্রসেসিং",
    rating: 5,
    comment:
      "সৌদি ভিসার সব অনলাইন কাজ এখান থেকেই করিয়েছি। খরচও যুক্তিসঙ্গত, কোনো লুকানো চার্জ নেই।",
    date: "২০২৫",
  },
  {
    id: "r5",
    name: "সালমা বেগম",
    service: "Photo & Document Printing",
    rating: 5,
    comment: "পাসপোর্ট সাইজ ছবির মান চমৎকার। প্রিন্ট ও ফটোকপি সঙ্গে সঙ্গেই পেয়েছি।",
    date: "২০২৫",
  },
  {
    id: "r6",
    name: "Mohammad Hasan",
    service: "জমির রেকর্ড (খতিয়ান)",
    rating: 4,
    comment: "খতিয়ান ও পর্চা অনলাইনে বের করে দিয়েছেন, অফিসে যাওয়ার ঝামেলা বেঁচে গেছে।",
    date: "২০২৫",
  },
];

export const ratingAverage =
  Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10;

export const heroStats = [
  { num: "5000+", label: "আবেদন সম্পন্ন" },
  { num: "7+", label: "মূল সেবা" },
  { num: "100%", label: "সন্তুষ্টির হার" },
];

export const aboutFeatures = [
  { title: "দ্রুত প্রক্রিয়া", sub: "একই দিনে সহায়তা পাওয়া যায়", icon: "bolt" },
  { title: "১০০% নির্ভুল", sub: "ত্রুটিমুক্ত জমা", icon: "shield" },
  { title: "সাশ্রয়ী মূল্য", sub: "স্বচ্ছ মূল্য নির্ধারণ", icon: "wallet" },
  { title: "সম্পূর্ণ সহায়তা", sub: "প্রতিটি ধাপে গাইডেন্স", icon: "headset" },
] as const;

export const whyUs = [
  {
    icon: "bolt",
    title: "দ্রুত প্রক্রিয়াকরণ",
    desc: "আমরা জানি আপনার সময় মূল্যবান। বেশিরভাগ আবেদন একই দিনে প্রক্রিয়া করে জমা দেওয়া হয়। সাধারণ কাজের জন্য সপ্তাহের পর সপ্তাহ অপেক্ষা নেই।",
  },
  {
    icon: "shield",
    title: "Secure & Confidential",
    desc: "আপনার ব্যক্তিগত নথি ও তথ্য সম্পূর্ণ গোপনীয়তা ও যত্নের সাথে পরিচালিত হয় — কখনও কারও সাথে শেয়ার বা অপব্যবহার করা হয় না।",
  },
  {
    icon: "heart",
    title: "সমাজ সবার আগে",
    desc: "আমরা হারবাং বাজারের স্থানীয় ব্যবসা। আপনার ভাষায় কথা বলি, আপনার প্রয়োজন বুঝি এবং ফলো-আপের জন্য সবসময় কাছেই আছি।",
  },
] as const;
