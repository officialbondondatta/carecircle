import Link from "next/link";
import { MapPinOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="flex flex-1 items-center justify-center px-6 py-16 lg:py-24">
            <div className="w-full max-w-xl rounded-2xl bg-carecircle-secondary px-6 py-12 text-center">
                <MapPinOff className="mx-auto mb-5 size-12 text-carecircle-primary" aria-hidden="true" />
                <p className="text-6xl font-bold text-carecircle-primary">404</p>
                <h1 className="mt-4 text-3xl font-semibold text-carecircle-primary">Page not found</h1>
                <p className="mx-auto mt-3 max-w-sm leading-relaxed text-carecircle-text/75">The page you’re looking for doesn’t exist or may have been removed. Let’s get you back to your community.</p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                    <Button nativeButton={false} render={<Link href="/" />} className="h-11 bg-carecircle-primary px-6 text-white hover:bg-carecircle-primary/90">
                        Back to Home
                    </Button>
                    <Button nativeButton={false} render={<Link href="/upcoming-event" />} className="h-11 bg-carecircle-button px-6 text-carecircle-text hover:bg-carecircle-button/90">
                        Explore Events
                    </Button>
                </div>
            </div>
        </main>
    );
}
