import { SVGProps } from "react";
import { cn } from "@/lib/utils";

export function CometIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M12.25 2.25 10.5 8l-5.75 1.75L10.5 11.5l1.75 5.75L14 11.5l5.75-1.75L14 8l-1.75-5.75Z" fill="gold" />
      <path d="m17 17 5 5" stroke="gold" />
    </svg>
  );
}
