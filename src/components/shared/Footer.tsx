import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { connection } from "next/server";

async function Copyright() {
    await connection();
    const year = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        timeZone: "Asia/Dhaka",
    }).format(new Date());

    return <p>© {year} Care Circle. All rights reserved.</p>;
}

const Footer = () => {
    return (
        <footer className="mt-10 bg-carecircle-primary text-carecircle-bg">
            <div className="mx-auto max-w-7xl px-6 pt-12 lg:px-8">
                <div className="flex flex-col gap-6 border-b border-carecircle-bg/20 pb-10 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="mb-2 text-sm font-semibold text-carecircle-button">A little time. A lasting difference.</p>
                        <h2 className="max-w-xl text-3xl font-bold leading-tight md:text-4xl">Good things happen when we come together.</h2>
                    </div>
                    <Button nativeButton={false} render={<Link href="/upcoming-event" />} className="h-12 w-fit shrink-0 gap-2 bg-carecircle-button px-6 font-semibold text-carecircle-text hover:bg-carecircle-button/90">
                        Find your next event <ArrowUpRight aria-hidden="true" />
                    </Button>
                </div>

                <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
                    <div>
                        <Link href="/" className="inline-block rounded-lg bg-carecircle-bg px-4 py-2">
                            <Image src="/carecircle-logo.svg" alt="Care Circle home" width={180} height={48} className="h-12 w-45 object-contain" />
                        </Link>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-carecircle-bg/80">Connecting neighbors through care, support, and community. Discover local events and lend a hand where it matters.</p>
                    </div>

                    <nav aria-label="Footer explore links">
                        <h3 className="mb-4 text-lg font-semibold text-carecircle-button">Explore</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="underline-offset-4 hover:underline">Home</Link></li>
                            <li><Link href="/upcoming-event" className="underline-offset-4 hover:underline">Upcoming Events</Link></li>
                            <li><Link href="/create-event" className="underline-offset-4 hover:underline">Create an Event</Link></li>
                        </ul>
                    </nav>

                    <nav aria-label="Footer account links">
                        <h3 className="mb-4 text-lg font-semibold text-carecircle-button">Your Circle</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/joined-event" className="underline-offset-4 hover:underline">Joined Events</Link></li>
                            <li><Link href="/manage-event" className="underline-offset-4 hover:underline">Manage Events</Link></li>
                            <li><Link href="/signup" className="underline-offset-4 hover:underline">Create an Account</Link></li>
                            <li><Link href="/signin" className="underline-offset-4 hover:underline">Log In</Link></li>
                        </ul>
                    </nav>
                </div>

                <div className="flex flex-col gap-3 border-t border-carecircle-bg/20 py-5 text-xs text-carecircle-bg/75 sm:flex-row sm:items-center sm:justify-between">
                    <Suspense fallback={<p>© Care Circle. All rights reserved.</p>}>
                        <Copyright />
                    </Suspense>
                    <p className="flex items-center gap-2"><Heart className="size-4 text-carecircle-button" aria-hidden="true" /> Built around people. Brought together by care.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
