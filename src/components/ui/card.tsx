import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

function Card({ className, ...props }: ComponentProps<"div">) {
    return <div data-slot="card" className={cn("flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm", className)} {...props} />;
}

function CardHeader({ className, ...props }: ComponentProps<"div">) {
    return <div data-slot="card-header" className={cn("space-y-2 px-5 pt-5", className)} {...props} />;
}

function CardTitle({ className, ...props }: ComponentProps<"h3">) {
    return <h3 data-slot="card-title" className={cn("text-xl font-semibold leading-tight", className)} {...props} />;
}

function CardContent({ className, ...props }: ComponentProps<"div">) {
    return <div data-slot="card-content" className={cn("px-5 py-4", className)} {...props} />;
}

function CardFooter({ className, ...props }: ComponentProps<"div">) {
    return <div data-slot="card-footer" className={cn("flex items-center px-5 pb-5", className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
