
"use client"

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

import { categories, featuredProducts as allProducts, Product } from '@/lib/placeholder-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const initialQuery = searchParams.get('q') || ''
  const initialCategory = searchParams.get('category') || 'all'

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)

  const filteredProducts = useMemo(() => {
    let products = allProducts

    if (selectedCategory !== 'all') {
      products = products.filter(p => p.category === selectedCategory)
    }

    if (searchQuery) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return products
  }, [searchQuery, selectedCategory])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    updateURL(e.target.value, selectedCategory)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    updateURL(searchQuery, category)
  }
  
  const updateURL = (query: string, category: string) => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (category !== 'all') params.set('category', category)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <aside className="w-full lg:w-1/4">
          <div className="sticky top-24 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 font-headline">جستجو</h3>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="نام محصول..."
                  className="w-full pr-9"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 font-headline">دسته بندی ها</h3>
              <div className="space-y-2 flex flex-col items-start">
                <Button
                  variant="ghost"
                  className={cn("w-full justify-start", selectedCategory === 'all' && 'bg-accent')}
                  onClick={() => handleCategoryChange('all')}
                >
                  همه محصولات
                </Button>
                {categories.map(category => (
                  <Button
                    key={category.name}
                    variant="ghost"
                    className={cn("w-full justify-start", selectedCategory === category.name && 'bg-accent')}
                    onClick={() => handleCategoryChange(category.name)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="w-full lg:w-3/4">
          <h1 className="text-3xl font-bold mb-6 font-headline">نتایج جستجو</h1>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">محصولی یافت نشد.</p>
              <p className="text-sm text-muted-foreground mt-2">عبارت جستجو یا دسته بندی خود را تغییر دهید.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function ProductCard({ id, name, price, image, imageHint, description, category }: Product) {
  return (
    <Card className="overflow-hidden group flex flex-col">
      <Link href={`/products/${id}`} className="block cursor-pointer">
        <CardHeader className="p-0">
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={image}
              alt={name}
              data-ai-hint={imageHint}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex flex-col flex-grow">
        <p className="text-sm text-muted-foreground mb-1">{category}</p>
        <CardTitle className="text-lg font-headline mb-2 flex-grow">
          <Link href={`/products/${id}`} className="cursor-pointer hover:underline">{name}</Link>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-3">{description.substring(0, 70)}...</CardDescription>
        <p className="text-base font-semibold mb-4">{price}</p>
        <Button className="w-full mt-auto cursor-pointer">افزودن به سبد خرید</Button>
      </CardContent>
    </Card>
  )
}

