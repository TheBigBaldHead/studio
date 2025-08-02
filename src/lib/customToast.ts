
import { toast } from "sonner";

export function CustomToast(message: string, type: "success" | "info" | "warning" | "error" = "success") {
    switch (type) {
        case "success":
            toast.success("موفق", { description: message });
            break;
        case "info":
            toast.info("اطلاع", { description: message });
            break;
        case "warning":
            toast.warning("اخطار", { description: message });
            break;
        case "error":
            toast.error("خطا", { description: message });
            break;
        default:
            toast("پیام", { description: message });
            break;
    }
}
