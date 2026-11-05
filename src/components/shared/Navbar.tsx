"use client";

import { useState } from "react";
import AuthButtons from "@/components/auth/AuthButtons";
import { Button } from "@/components/ui/button";
import { Lightbulb, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-carecircle-secondary" aria-label="Main navigation">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 px-5 py-4 lg:px-8">
                <Link href="/" onClick={() => setIsOpen(false)} className="relative block h-11 w-40 shrink-0 md:h-12 md:w-45">
                    <Image src="/carecircle-logo.svg" alt="Care Circle home" fill sizes="(min-width: 768px) 180px, 160px" priority className="object-contain" />
                </Link>

                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isOpen}
                    aria-controls="navbar-links"
                    onClick={() => setIsOpen(!isOpen)}
                    className="size-11 text-carecircle-primary md:hidden"
                >
                    {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                </Button>

                <div
                    id="navbar-links"
                    className={`${isOpen ? "flex" : "hidden"} w-full flex-col items-start gap-5 border-t border-carecircle-primary/15 pt-5 mt-4 md:mt-0 md:flex md:w-auto md:flex-1 md:flex-row md:items-center md:justify-end md:gap-8 md:border-0 md:pt-0 lg:gap-16`}
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
                    <Link href="/upcoming-event" className="flex min-h-11 items-center gap-2 font-bold text-carecircle-primary hover:underline underline-offset-4">
                        <Lightbulb className="size-5" aria-hidden="true" /> Upcoming Events
                    </Link>
                    <AuthButtons />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
