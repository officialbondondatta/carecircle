"use client";

import { useState } from "react";
import AuthButtons from "@/components/auth/AuthButtons";
import { Button } from "@/components/ui/button";
import { Lightbulb, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-carecircle-secondary" aria-label="Main navigation">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-1 px-2 py-4 sm:gap-x-4 sm:px-5 lg:justify-start lg:gap-x-6 lg:px-8">
                <Link href="/" onClick={() => setIsOpen(false)} className="relative block h-11 w-32 shrink-0 sm:w-40 lg:h-12 lg:w-45">
                    <Image src="/carecircle-logo.svg" alt="Care Circle home" fill sizes="(min-width: 1024px) 180px, (min-width: 640px) 160px, 128px" priority className="object-contain" />
                </Link>

                <div className="flex shrink-0 items-center gap-0 sm:gap-2 lg:order-last">
                    <AuthButtons placement="account" />
                    <div className="hidden lg:block">
                        <AuthButtons placement="menu" />
                    </div>
                    <ThemeToggle />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isOpen}
                        aria-controls="navbar-links"
                        onClick={() => setIsOpen(!isOpen)}
                        className="size-9 text-carecircle-primary sm:size-11 lg:hidden"
                    >
                        {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                    </Button>
                </div>

                <div
                    id="navbar-links"
                    className={`${isOpen ? "flex" : "hidden"} order-4 w-full flex-col items-start gap-5 border-t border-carecircle-primary/15 pt-5 mt-4 lg:order-0 lg:mt-0 lg:ml-auto lg:flex lg:w-auto lg:flex-row lg:items-center lg:border-0 lg:pt-0`}
                    onClick={(event) => {
                        if (event.target instanceof Element && event.target.closest("a")) setIsOpen(false);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Escape") {
                            setIsOpen(false);
                            document.querySelector<HTMLButtonElement>('[aria-controls="navbar-links"]')?.focus();
                        }
                    }}
                >
                    <Link href="/upcoming-event" onClick={() => setIsOpen(false)} className="flex min-h-11 items-center gap-2 whitespace-nowrap text-xs font-bold text-carecircle-primary underline-offset-4 hover:underline sm:text-base">
                        <Lightbulb className="size-5" aria-hidden="true" /> Upcoming Events
                    </Link>

                    <div className="lg:hidden">
                        <AuthButtons placement="menu" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
