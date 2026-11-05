"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
    const { setTheme } = useTheme();

    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Toggle light or dark theme"
            onClick={() => setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark")}
            className="size-11 shrink-0 text-carecircle-primary"
        >
            <Moon className="size-5 dark:hidden" aria-hidden="true" />
            <Sun className="hidden size-5 dark:block" aria-hidden="true" />
        </Button>
    );
}
