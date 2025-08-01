
import { toast } from "@/hooks/use-toast";

export function CustomToast(message: string, variant: "default" | "destructive" = "default") {
    toast({
        title: variant === "destructive" ? "خطا" : "موفق",
        description: message,
        variant: variant,
    });
}
