import Image from "next/image"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import { categories, featuredProducts } from "@/lib/placeholder-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewArrivalAnalyzer } from "@/components/new-arrival-analyzer"

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-gradient-to-r from-primary/20 via-background to-background">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter font-headline">
              Radiance Redefined
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Explore our curated collection of luxury cosmetics and unlock your inner glow.
            </p>
            <Button size="lg" asChild>
              <Link href="#featured">Shop Now</Link>
            </Button>
          </div>
          <div className="relative h-64 md:h-96">
            <Image
              src="https://placehold.co/800x600.png"
              alt="Cosmetic products display"
              data-ai-hint="cosmetics flatlay"
              fill
              className="object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      <section id="categories" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Shop by Category</h2>
            <p className="text-muted-foreground mt-2">Find exactly what you're looking for.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.name} {...category} />
            ))}
          </div>
        </div>
      </section>

      <section id="featured" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Featured Products</h2>
            <p className="text-muted-foreground mt-2">Handpicked essentials for your beauty ritual.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      <section id="new-arrivals" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <NewArrivalAnalyzer />
        </div>
      </section>
    </div>
  )
}

function CategoryCard({ name, description, icon: Icon, href }: { name: string, description: string, icon: LucideIcon, href: string }) {
  return (
    <Link href={href}>
      <Card className="text-center p-6 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-primary/20 rounded-full">
            <Icon className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h3 className="text-xl font-bold font-headline mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </Card>
    </Link>
  )
}

function ProductCard({ id, name, price, image, imageHint }: { id: string, name: string, price: string, image: string, imageHint: string }) {
  return (
    <Card className="overflow-hidden group">
      <CardHeader className="p-0">
        <Link href={`/products/${id}`}>
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={image}
              alt={name}
              data-ai-hint={imageHint}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-headline mb-1">{name}</CardTitle>
        <CardDescription className="text-base">{price}</CardDescription>
        <Button className="w-full mt-4">Add to Bag</Button>
      </CardContent>
    </Card>
  )
}
