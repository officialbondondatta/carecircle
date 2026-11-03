"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn, signUp } from "@/lib/auth-client";
import { toast } from "sonner";


export default function SignUpPage() {
    const router = useRouter();
    const [pending, setPending] = useState<"email" | "google" | null>(null);
    const [error, setError] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget
        const data = new FormData(form);
        setError("");
        const password = String(data.get("password"));
        if (
            password.length < 6 ||
            !/[A-Z]/.test(password) ||
            !/[a-z]/.test(password)
        ) {
            const message = "Password must be at least 6 characters and include an uppercase and a lowercase letter.";
            setError(message);
            toast.error(message);
            return;
        }
        setPending("email");
        try {
            const result = await signUp.email({
                name: String(data.get("name")),
                email: String(data.get("email")).trim(),
                image: String(data.get("image")).trim(),
                password,
            });
            if (result.error) {
                setError(result.error.message || "Unable to register! Please try again.");
            } else {
                form.reset()
                router.push("/");
                toast.success("Registration Successful!")
                router.refresh();
            }
        } catch {
            setError("Unable to connect. Please try again.");
        } finally {
            setPending(null);
        }
    }

    const handleGoogleSignIn = async () => {
        setError("");
        setPending("google");
        try {
            const result = await signIn.social({ provider: "google", callbackURL: "/" });
            if (result.error) {
                setError(result.error.message || "Google sign-in is unavailable. Please try again.");
                setPending(null);
            }
        } catch {
            setError("Unable to connect to Google. Please try again.");
            setPending(null);
        }
    }

    return (
        <main className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-6 py-10 text-carecircle-text md:grid-cols-2 md:gap-16 md:py-16 lg:gap-24">
            <section className="hidden rounded-3xl bg-carecircle-secondary p-8 md:block lg:p-10" aria-label="Welcome to Care Circle">
                <div className="flex flex-col items-center justify-center">
                    <Leaf className="mb-8 size-10 text-carecircle-primary" strokeWidth={1.5} aria-hidden="true" />
                    <h2 className="font-serif text-4xl leading-[1.12] text-carecircle-primary text-center lg:text-5xl">A little of your time. <br /> A world of possibility.</h2>
                </div>
                <div className="relative mt-7 aspect-square overflow-hidden rounded-2xl">
                    <Image src="https://i.ibb.co.com/DfLCb9V5/care-circle-flood-relief-modern.png" alt="register page image" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain"
                        loading="eager" />
                </div>
                <p className="mt-6 text-sm leading-relaxed text-carecircle-primary">Find your people. Make your neighborhood a little brighter.</p>
            </section>

            <section className="mx-auto w-full max-w-md" aria-labelledby="signin-heading">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-carecircle-primary">You belong here</p>
                <h1 id="signin-heading" className="font-serif text-4xl leading-tight tracking-tight text-carecircle-primary">Join the community</h1>
                <p className="mt-4 text-sm text-carecircle-text/70">Create an account to join and organize local events.</p>
                <Button type="button" variant="outline" disabled={pending !== null} onClick={handleGoogleSignIn} className="mt-6 cursor-pointer h-11 w-full gap-3 rounded-full bg-white hover:bg-carecircle-secondary/50">
                    {pending === "google" ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <span className="font-sans font-bold" aria-hidden="true">G</span>}
                    {pending === "google" ? "Connecting to Google…" : "Continue with Google"}
                </Button>
                <div className="my-6 flex items-center gap-3 text-xs text-carecircle-text/60">
                    <span className="h-px flex-1 bg-carecircle-primary/20" /><span>or use your email</span><span className="h-px flex-1 bg-carecircle-primary/20" />
                </div>
                <form onSubmit={handleSubmit} className="space-y-5" aria-busy={pending !== null}>
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium">Your Name</label>
                        <Input id="name" name="name" type="text" autoComplete="name" placeholder="Bondon Datta" required disabled={pending !== null} className="border-carecircle-primary/20 bg-white focus-visible:border-carecircle-primary focus-visible:ring-carecircle-primary/20" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium">Email address</label>
                        <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required disabled={pending !== null} className="border-carecircle-primary/20 bg-white focus-visible:border-carecircle-primary focus-visible:ring-carecircle-primary/20" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="image" className="block text-sm font-medium">Image URL</label>
                        <Input id="image" name="image" type="text" autoComplete="image" placeholder="youimage.example.com" required disabled={pending !== null} className="border-carecircle-primary/20 bg-white focus-visible:border-carecircle-primary focus-visible:ring-carecircle-primary/20" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium">Password</label>
                        <Input id="password" name="password" type="password" autoComplete="new-password" required disabled={pending !== null} className="border-carecircle-primary/20 bg-white focus-visible:border-carecircle-primary focus-visible:ring-carecircle-primary/20" />
                    </div>
                    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
                    <Button type="submit" disabled={pending !== null} className="h-11 w-full rounded-full bg-carecircle-button cursor-pointer text-carecircle-text hover:bg-carecircle-button/80">
                        {pending === "email" && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
                        {pending === "email" ? "Signing Up…" : "Register"}
                    </Button>
                </form>
                <p className="mt-5 text-sm text-carecircle-primary">Already have an account? <Link href="/signin" className="font-semibold underline-offset-4 hover:underline">Login here</Link></p>
                <p className="mt-7 text-xs leading-relaxed text-carecircle-text/60">A little care goes a long way. Thanks for being part of it.</p>
            </section>
        </main>
    );
}
