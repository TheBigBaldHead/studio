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
    href: "/search?category=مراقبت از پوست",
  },
  {
    name: "آرایش",
    description: "با مجموعه پر جنب و جوش ما خود را ابراز کنید.",
    icon: Brush,
    href: "/search?category=آرایش",
  },
  {
    name: "عطر",
    description: "عطر امضای خود را کشف کنید.",
    icon: SprayCan,
    href: "/search?category=عطر",
  },
  {
    name: "مراقبت از مو",
    description: "با فرمول های تخصصی ما به موهایی شاداب دست پیدا کنید.",
    icon: Wind,
    href: "/search?category=مراقبت از مو",
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
    description: "یک سرم ویتامین C برای چهره ای درخشان که به پوست شما طراوت و جوانی می‌بخشد.",
    price: "۴۵۰,۰۰۰ تومان",
    image: "https://placehold.co/600x600.png",
    imageHint: "skincare product",
    category: "مراقبت از پوست",
  },
  {
    id: "2",
    name: "رژ لب مخملی",
    description: "یک رژ لب مات غنی و با ماندگاری بالا در رنگ‌های جذاب و متنوع.",
    price: "۲۸۰,۰۰۰ تومان",
    image: "https://placehold.co/600x600.png",
    imageHint: "lipstick makeup",
    category: "آرایش",
  },
  {
    id: "3",
    name: "عطر شکوفه",
    description: "یک ادو پرفیوم گلی و تازه با رایحه‌ای که شما را در مرکز توجه قرار می‌دهد.",
    price: "۸۲۰,۰۰۰ تومان",
    image: "https://placehold.co/600x600.png",
    imageHint: "perfume fragrance",
    category: "عطر",
  },
  {
    id: "4",
    name: "شامپو آبرسان",
    description: "شامپوی ملایم برای موهای خشک و آسیب دیده که رطوبت را به موهای شما باز می‌گرداند.",
    price: "۳۴۰,۰۰۰ تومان",
    image: "https://placehold.co/600x600.png",
    imageHint: "shampoo hair",
    category: "مراقبت از مو",
  },
   {
    id: "5",
    name: "کرم پودر درخشان",
    description: "کرم پودر سبک برای پایانی طبیعی و شبنم دار که نواقص پوست را به خوبی می‌پوشاند.",
    price: "۵۵۰,۰۰۰ تومان",
    image: "https://placehold.co/600x600.png",
    imageHint: "foundation makeup",
    category: "آرایش",
  },
  {
    id: "6",
    name: "پالت سایه چشم غروب",
    description: "پالتی از سایه های گرم و آفتابی برای آرایشی چشم‌نواز و جذاب.",
    price: "۴۹۰,۰۰۰ تومان",
    image: "https://placehold.co/600x600.png",
    imageHint: "eyeshadow palette",
    category: "آرایش",
  },
  {
    id: '7',
    name: 'کرم مرطوب کننده هیدرو بوست',
    description: 'یک مرطوب کننده سبک و بدون چربی برای آبرسانی فوری و طولانی مدت پوست.',
    price: '۳۸۰,۰۰۰ تومان',
    image: 'https://placehold.co/600x600.png',
    imageHint: 'moisturizer cream',
    category: 'مراقبت از پوست',
  },
  {
    id: '8',
    name: 'ریمل حجم دهنده بیگ لش',
    description: 'ریملی برای مژه هایی پرپشت و چشمگیر بدون ایجاد چسبندگی.',
    price: '۳۱۰,۰۰۰ تومان',
    image: 'https://placehold.co/600x600.png',
    imageHint: 'mascara makeup',
    category: 'آرایش',
  },
  {
    id: '9',
    name: 'اسپری مو نگهدارنده قوی',
    description: 'مدل موی خود را در تمام طول روز با این اسپری قوی و بدون ایجاد سنگینی ثابت نگه دارید.',
    price: '۲۵۰,۰۰۰ تومان',
    image: 'https://placehold.co/600x600.png',
    imageHint: 'hairspray product',
    category: 'مراقبت از مو',
  },
];
