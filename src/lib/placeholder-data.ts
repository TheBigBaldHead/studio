import type { LucideIcon } from "lucide-react";
import { Brush, Droplets, SprayCan, Wind } from "lucide-react";

export type Category = {
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

export const categories: Category[] = [
  {
    name: "مراقبت از پوست",
    description: "پوست خود را با بهترین انتخاب ما تغذیه کنید.",
    icon: Droplets,
    href: "#",
  },
  {
    name: "آرایش",
    description: "با مجموعه پر جنب و جوش ما خود را ابراز کنید.",
    icon: Brush,
    href: "#",
  },
  {
    name: "عطر",
    description: "عطر امضای خود را کشف کنید.",
    icon: SprayCan,
    href: "#",
  },
  {
    name: "مراقبت از مو",
    description: "با فرمول های تخصصی ما به موهایی شاداب دست پیدا کنید.",
    icon: Wind,
    href: "#",
  },
];

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  imageHint: string;
};

export const featuredProducts: Product[] = [
  {
    id: "1",
    name: "سرم درخشان کننده",
    description: "یک سرم ویتامین C برای چهره ای درخشان.",
    price: "۴۵۰,۰۰۰ تومان",
    image: "https://placehold.co/600x600.png",
    imageHint: "skincare bottle",
  },
  {
    id: "2",
    name: "رژ لب مخملی",
    description: "یک رژ لب مات غنی و با ماندگاری بالا.",
    price: "۲۸۰,۰۰۰ تومان",
    image: "https://placehold.co/600x600.png",
    imageHint: "lipstick product",
  },
  {
    id: "3",
    name: "عطر شکوفه",
    description: "یک ادو پرفیوم گلی و تازه.",
    price: "۸۲۰,۰۰۰ تومان",
    image: "https://placehold.co/600x600.png",
    imageHint: "perfume bottle",
  },
  {
    id: "4",
    name: "شامپو آبرسان",
    description: "شامپوی ملایم برای موهای خشک و آسیب دیده.",
    price: "۳۴۰,۰۰۰ تومان",
    image: "https://placehold.co/600x600.png",
    imageHint: "shampoo bottle",
  },
   {
    id: "5",
    name: "کرم پودر درخشان",
    description: "کرم پودر سبک برای پایانی طبیعی و شبنم دار.",
    price: "۵۵۰,۰۰۰ تومان",
    image: "https://placehold.co/600x600.png",
    imageHint: "foundation cosmetics",
  },
  {
    id: "6",
    name: "پالت سایه چشم غروب",
    description: "پالتی از سایه های گرم و آفتابی.",
    price: "۴۹۰,۰۰۰ تومان",
    image: "https://placehold.co/600x600.png",
    imageHint: "eyeshadow palette",
  },
];
