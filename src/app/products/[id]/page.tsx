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
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
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
          <p className="mt-6 text-base text-foreground/80 leading-relaxed">{product.description}</p>
          <div className="mt-8">
            <Button size="lg" className="w-full md:w-auto">افزودن به سبد خرید</Button>
          </div>
          <div className="mt-8 space-y-4 text-sm">
            <div>
              <h3 className="font-semibold font-headline">موجودی</h3>
              <p className="text-muted-foreground">موجود در انبار</p>
            </div>
            <div>
              <h3 className="font-semibold font-headline">ارسال</h3>
              <p className="text-muted-foreground">ارسال در ۱-۲ روز کاری.</p>
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
