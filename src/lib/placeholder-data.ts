import { Brush, Droplets, SprayCan, Wind, type Icon as LucideIcon } from "lucide-react";

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
  category: string;
};

export const featuredProducts: Product[] = [
  {
    id: "1",
    name: "سرم درخشان کننده",
    description: "یک سرم ویتامین C برای چهره ای درخشان.",
    price: "۴۵۰,۰۰۰ تومان",
    image: "https://placehold.co/600x600.png",
    imageHint: "skincare product",
    category: "مراقبت از پوست",
  },
  {
    id: "2",
    name: "رژ لب مخملی",
    description: "یک رژ لب مات غنی و با ماندگاری بالا.",
    price: "۲۸۰,۰۰۰ تومان",
    image: "https://placehold.co/600x600.png",
    imageHint: "lipstick makeup",
    category: "آرایش",
  },
  {
    id: "3",
    name: "عطر شکوفه",
    description: "یک ادو پرفیوم گلی و تازه.",
    price: "۸۲۰,۰۰۰ تومان",
    image: "https://placehold.co/600x600.png",
    imageHint: "perfume fragrance",
    category: "عطر",
  },
  {
    id: "4",
    name: "شامپو آبرسان",
    description: "شامپوی ملایم برای موهای خشک و آسیب دیده.",
    price: "۳۴۰,۰۰۰ تومان",
    image: "https://placehold.co/600x600.png",
    imageHint: "shampoo hair",
    category: "مراقبت از مو",
  },
   {
    id: "5",
    name: "کرم پودر درخشان",
    description: "کرم پودر سبک برای پایانی طبیعی و شبنم دار.",
    price: "۵۵۰,۰۰۰ تومان",
    image: "https://placehold.co/600x600.png",
    imageHint: "foundation makeup",
    category: "آرایش",
  },
  {
    id: "6",
    name: "پالت سایه چشم غروب",
    description: "پالتی از سایه های گرم و آفتابی.",
    price: "۴۹۰,۰۰۰ تومان",
    image: "https://placehold.co/600x600.png",
    imageHint: "eyeshadow palette",
    category: "آرایش",
  },
  {
    id: '7',
    name: 'کرم مرطوب کننده هیدرو بوست',
    description: 'یک مرطوب کننده سبک و بدون چربی برای آبرسانی فوری.',
    price: '۳۸۰,۰۰۰ تومان',
    image: 'https://placehold.co/600x600.png',
    imageHint: 'moisturizer cream',
    category: 'مراقبت از پوست',
  },
  {
    id: '8',
    name: 'ریمل حجم دهنده بیگ لش',
    description: 'ریملی برای مژه هایی پرپشت و چشمگیر.',
    price: '۳۱۰,۰۰۰ تومان',
    image: 'https://placehold.co/600x600.png',
    imageHint: 'mascara makeup',
    category: 'آرایش',
  },
  {
    id: '9',
    name: 'اسپری مو نگهدارنده قوی',
    description: 'مدل موی خود را در تمام طول روز با این اسپری قوی ثابت نگه دارید.',
    price: '۲۵۰,۰۰۰ تومان',
    image: 'https://placehold.co/600x600.png',
    imageHint: 'hairspray product',
    category: 'مراقبت از مو',
  },
];
