"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    return (
        <main className="flex flex-1 items-center justify-center px-6 py-16 lg:py-24">
            <div role="alert" className="w-full max-w-xl rounded-2xl bg-carecircle-secondary px-6 py-12 text-center text-carecircle-text">
                <AlertCircle className="mx-auto mb-5 size-12 text-carecircle-primary" aria-hidden="true" />
                <h1 className="text-3xl font-semibold text-carecircle-primary">Unable to load this page</h1>
                <p className="mt-3">Something went wrong. Please try again in a moment.</p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <Button disabled={pending} onClick={() => startTransition(() => { router.refresh(); reset(); })} className="bg-carecircle-primary text-white">
                        {pending ? "Trying again…" : "Try again"}
                    </Button>
                    <Button variant="outline" nativeButton={false} render={<Link href="/" />}>Back to Home</Button>
                </div>
            </div>
        </main>
    );
}
