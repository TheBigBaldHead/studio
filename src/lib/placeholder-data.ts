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
    name: "Skincare",
    description: "Nourish your skin with our finest selection.",
    icon: Droplets,
    href: "#",
  },
  {
    name: "Makeup",
    description: "Express yourself with our vibrant collection.",
    icon: Brush,
    href: "#",
  },
  {
    name: "Fragrance",
    description: "Discover your signature scent.",
    icon: SprayCan,
    href: "#",
  },
  {
    name: "Hair Care",
    description: "Achieve luscious locks with our expert formulas.",
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
    name: "Glow Serum",
    description: "A vitamin C serum for a radiant complexion.",
    price: "$45.00",
    image: "https://placehold.co/600x600.png",
    imageHint: "skincare bottle",
  },
  {
    id: "2",
    name: "Velvet Lipstick",
    description: "A rich, long-lasting matte lipstick.",
    price: "$28.00",
    image: "https://placehold.co/600x600.png",
    imageHint: "lipstick product",
  },
  {
    id: "3",
    name: "Bloom Perfume",
    description: "A floral and fresh eau de parfum.",
    price: "$82.00",
    image: "https://placehold.co/600x600.png",
    imageHint: "perfume bottle",
  },
  {
    id: "4",
    name: "Hydrating Shampoo",
    description: "A gentle shampoo for dry and damaged hair.",
    price: "$34.00",
    image: "https://placehold.co/600x600.png",
    imageHint: "shampoo bottle",
  },
   {
    id: "5",
    name: "Radiant Foundation",
    description: "Lightweight foundation for a natural, dewy finish.",
    price: "$55.00",
    image: "https://placehold.co/600x600.png",
    imageHint: "foundation cosmetics",
  },
  {
    id: "6",
    name: "Sunset Eyeshadow Palette",
    description: "A palette of warm, sun-kissed shades.",
    price: "$49.00",
    image: "https://placehold.co/600x600.png",
    imageHint: "eyeshadow palette",
  },
];
