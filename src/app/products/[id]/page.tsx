import Image from "next/image";
import { featuredProducts } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = featuredProducts.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            data-ai-hint={product.imageHint}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold font-headline">{product.name}</h1>
          <p className="text-2xl lg:text-3xl text-muted-foreground my-4">{product.price}</p>
          <Separator />
          <p className="mt-6 text-lg text-foreground/80">{product.description}</p>
          <div className="mt-8">
            <Button size="lg" className="w-full md:w-auto">Add to Bag</Button>
          </div>
          <div className="mt-8 space-y-4">
            <div>
              <h3 className="font-semibold font-headline">Availability</h3>
              <p className="text-sm text-muted-foreground">In Stock</p>
            </div>
            <div>
              <h3 className="font-semibold font-headline">Shipping</h3>
              <p className="text-sm text-muted-foreground">Ships in 1-2 business days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// This function can be used to generate static pages for each product at build time.
export async function generateStaticParams() {
  return featuredProducts.map((product) => ({
    id: product.id,
  }));
}
