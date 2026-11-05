"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import type { IUserProps } from "@/lib/types";

export default function ProfileForm({ user }: { user: IUserProps }) {
    const [name, setName] = useState(user.name);
    const [image, setImage] = useState(user.image || "");
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");
    const { refetch } = useSession();
    const router = useRouter();
    const previewImage = /^https?:\/\//i.test(image.trim()) ? image.trim() : undefined;

    async function handleSave(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (pending) return;
        setError("");
        const updatedName = name.trim();
        const updatedImage = image.trim();
        if (!updatedName) {
            setError("Please enter your name.");
            return;
        }
        if (updatedImage && !/^https?:\/\//i.test(updatedImage)) {
            setError("Please use an image URL starting with https:// or http://.");
            return;
        }
        setPending(true);
        try {
            const token = await getTokenFromClient();
            const response = await fetch(`${process.env.NEXT_PUBLIC_CIRCLESERVER}/user/${encodeURIComponent(user.email)}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                // The current server reads `iamge`; retain `image` for the corrected API.
                body: JSON.stringify({ name: updatedName, image: updatedImage, iamge: updatedImage }),
            });
            const result = await response.json();
            if (!response.ok || result.acknowledged === false) {
                throw new Error(result.message || result.msg || "Unable to update your profile. Please try again.");
            }
            setName(updatedName);
            setImage(updatedImage);
            toast.success("Profile updated successfully");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Unable to update your profile. Please try again.");
            setPending(false);
            return;
        }
        try {
            await refetch({ query: { disableCookieCache: true } });
            router.refresh();
        } catch {
            toast.warning("Your profile was saved. Refresh the page to update your account menu.");
        } finally {
            setPending(false);
        }
    }

    return (
        <section className="overflow-hidden rounded-2xl border border-carecircle-primary/10 bg-carecircle-secondary text-carecircle-text">
            <div className="flex items-center gap-4 border-b border-carecircle-primary/10 p-6 sm:p-8">
                <Avatar className="size-20 shrink-0 ring-4 ring-white/60">
                    <AvatarImage src={previewImage} alt={name.trim() || "Profile preview"} className="object-cover" />
                    <AvatarFallback className="bg-carecircle-primary text-2xl text-white">{name.trim().charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                    <h2 className="break-words text-xl font-semibold">{name.trim() || "Your profile"}</h2>
                    <p className="mt-1 break-all text-sm text-carecircle-text/70">{user.email}</p>
                </div>
            </div>
            <form onSubmit={handleSave} aria-busy={pending} className="space-y-5 p-6 sm:p-8">
                <div className="space-y-2">
                    <label htmlFor="profile-name" className="block text-sm font-medium">Your name</label>
                    <Input id="profile-name" name="name" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} disabled={pending} className="h-11 bg-white" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="profile-email" className="block text-sm font-medium">Email address</label>
                    <Input id="profile-email" type="email" value={user.email} readOnly aria-describedby="email-help" className="h-11 bg-white/50 text-carecircle-text/60" />
                    <p id="email-help" className="text-xs text-carecircle-text/70">Your sign-in email cannot be changed here.</p>
                </div>
                <div className="space-y-2">
                    <label htmlFor="profile-image" className="block text-sm font-medium">Profile image URL</label>
                    <Input id="profile-image" name="image" type="url" placeholder="https://example.com/your-photo.jpg" value={image} onChange={(event) => setImage(event.target.value)} disabled={pending} aria-describedby="image-help" className="h-11 bg-white" />
                    <p id="image-help" className="text-xs text-carecircle-text/70">Paste a link to your photo, or leave blank to use your initial.</p>
                </div>
                {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
                <Button type="submit" disabled={pending} className="h-11 w-full cursor-pointer rounded-full bg-carecircle-button font-semibold text-carecircle-text hover:bg-carecircle-button/80 sm:w-auto sm:px-8">
                    {pending && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
                    {pending ? "Saving changes…" : "Save Changes"}
                </Button>
            </form>
        </section>
    );
}
