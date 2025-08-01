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
    message: "Description must be at least 10 characters.",
  }),
  trendingKeywords: z.string().min(3, {
    message: "Please enter at least one keyword.",
  }),
  currentSeason: z.string().min(3, {
    message: "Season must be at least 3 characters.",
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
      currentSeason: "Summer",
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
          <div className="flex items-center gap-2 mb-2">
            <Wand2 className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold font-headline">New Arrival Analyzer</h3>
          </div>
          <CardDescription>
            Leverage our AI to predict the popularity of a new product before it even hits the shelves.
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
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., A hydrating vegan lip balm with a hint of shimmer..."
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
                    <FormLabel>Trending Keywords</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., clean beauty, glass skin, spf" {...field} />
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
                    <FormLabel>Current Season</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Summer, Fall" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  "Analyzing..."
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Determine Popularity
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="lg:mt-[90px]">
        {isLoading && (
           <Card className="flex flex-col items-center justify-center p-8 h-full min-h-[300px]">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
             <p className="mt-4 text-muted-foreground">AI is thinking...</p>
           </Card>
        )}
        {result && (
          <Card className="bg-card/80">
            <CardHeader>
              <CardTitle>Analysis Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={cn(
                  "p-4 rounded-lg text-lg font-semibold flex items-center justify-center mb-4",
                  result.isPopular
                    ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                    : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                )}
              >
                {result.isPopular ? "Likely to be Popular!" : "Might Not Be Popular"}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Reasoning:</span> {result.reasoning}
              </p>
            </CardContent>
            <CardFooter>
                <Button variant="outline" onClick={() => setResult(null)}>Analyze Another</Button>
            </CardFooter>
          </Card>
        )}
        {!isLoading && !result && (
             <Card className="flex flex-col items-center justify-center p-8 h-full min-h-[300px] border-dashed">
             <Wand2 className="h-12 w-12 text-muted-foreground/50" />
             <p className="mt-4 text-center text-muted-foreground">Your product popularity analysis will appear here.</p>
           </Card>
        )}
      </div>
    </div>
  )
}
