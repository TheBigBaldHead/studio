"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Sparkles, Wand2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { checkPopularity } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  productDescription: z.string().min(10, {
    message: "توضیحات باید حداقل ۱۰ کاراکتر باشد.",
  }),
  trendingKeywords: z.string().min(3, {
    message: "لطفا حداقل یک کلمه کلیدی وارد کنید.",
  }),
  currentSeason: z.string().min(3, {
    message: "فصل باید حداقل ۳ کاراکتر باشد.",
  }),
})

type FormValues = z.infer<typeof formSchema>

type AnalysisResult = {
  isPopular: boolean
  reasoning: string
}

export function NewArrivalAnalyzer() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productDescription: "",
      trendingKeywords: "",
      currentSeason: "تابستان",
    },
  })

  async function onSubmit(values: FormValues) {
    setIsLoading(true)
    setResult(null)
    try {
      const analysisResult = await checkPopularity(values)
      setResult(analysisResult)
    } catch (error) {
      console.error("Failed to analyze product popularity:", error)
      // Here you could use a toast to show an error message to the user
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Wand2 className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold font-headline">تحلیلگر محصولات جدید</h3>
          </div>
          <CardDescription>
            از هوش مصنوعی ما برای پیش‌بینی محبوبیت یک محصول جدید حتی قبل از عرضه به بازار استفاده کنید.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="productDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>توضیحات محصول</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="مثال: یک بالم لب گیاهی آبرسان با کمی درخشش..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trendingKeywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>کلمات کلیدی پرطرفدار</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: زیبایی پاک، پوست شیشه‌ای، ضد آفتاب" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentSeason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>فصل کنونی</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: تابستان، پاییز" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  "در حال تحلیل..."
                ) : (
                  <>
                    <Sparkles className="ml-2 h-4 w-4" />
                    تعیین محبوبیت
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="lg:sticky lg:top-24">
        {isLoading && (
           <Card className="flex flex-col items-center justify-center p-8 h-full min-h-[300px] lg:min-h-[480px]">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
             <p className="mt-4 text-muted-foreground">هوش مصنوعی در حال فکر کردن است...</p>
           </Card>
        )}
        {result && (
          <Card className="bg-card/80">
            <CardHeader>
              <CardTitle>نتیجه تحلیل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={cn(
                  "p-4 rounded-lg text-lg font-semibold flex items-center justify-center",
                  result.isPopular
                    ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                    : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                )}
              >
                {result.isPopular ? "احتمالاً محبوب خواهد بود!" : "ممکن است محبوب نباشد"}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">دلیل:</span> {result.reasoning}
              </p>
            </CardContent>
            <CardFooter>
                <Button variant="outline" onClick={() => setResult(null)}>تحلیل محصول دیگر</Button>
            </CardFooter>
          </Card>
        )}
        {!isLoading && !result && (
             <Card className="flex flex-col items-center justify-center p-8 h-full min-h-[300px] lg:min-h-[480px] border-dashed">
             <Wand2 className="h-12 w-12 text-muted-foreground/50" />
             <p className="mt-4 text-center text-muted-foreground">نتیجه تحلیل محبوبیت محصول شما در اینجا نمایش داده خواهد شد.</p>
           </Card>
        )}
      </div>
    </div>
  )
}
