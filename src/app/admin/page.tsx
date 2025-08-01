"use client";

import { useState } from "react";
import { PlusCircle, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { featuredProducts, type Product } from "@/lib/placeholder-data";

const productSchema = z.object({
  name: z.string().min(1, "نام محصول الزامی است"),
  description: z.string().min(1, "توضیحات محصول الزامی است"),
  price: z.string().min(1, "قیمت محصول الزامی است"),
  image: z.string().url("آدرس تصویر نامعتبر است"),
  imageHint: z.string().min(1, "راهنمای تصویر الزامی است"),
});

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>(featuredProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      image: "",
      imageHint: "",
    },
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    form.reset(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };
  
  const handleAddNew = () => {
    setEditingProduct(null);
    form.reset({
      name: "",
      description: "",
      price: "",
      image: "https://placehold.co/600x600.png",
      imageHint: "",
    });
    setIsDialogOpen(true);
  };

  const onSubmit = (values: z.infer<typeof productSchema>) => {
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...p, ...values } : p
        )
      );
    } else {
      setProducts([
        ...products,
        { id: String(products.length + 1), ...values },
      ]);
    }
    setEditingProduct(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>محصولات</CardTitle>
              <CardDescription>محصولات فروشگاه خود را مدیریت کنید.</CardDescription>
            </div>
            <Button onClick={handleAddNew}>
              <PlusCircle className="ml-2 h-4 w-4" />
              افزودن محصول
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>نام</TableHead>
                <TableHead className="hidden md:table-cell">توضیحات</TableHead>
                <TableHead>قیمت</TableHead>
                <TableHead>
                  <span className="sr-only">عملیات</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-sm truncate">
                    {product.description}
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">تغییر منو</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(product)}>
                          <Pencil className="ml-2 h-4 w-4" />
                          ویرایش
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(product.id)} className="text-destructive">
                           <Trash2 className="ml-2 h-4 w-4" />
                           حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "ویرایش محصول" : "افزودن محصول جدید"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام محصول</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>توضیحات</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>قیمت</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>آدرس تصویر</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="imageHint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>راهنمای تصویر (برای جستجو)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline">لغو</Button>
                </DialogClose>
                <Button type="submit">ذخیره</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
