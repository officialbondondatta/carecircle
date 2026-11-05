"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function LogoutButton({ className = "" }: { className?: string }) {
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        if (pending) return;
        setPending(true);
        try {
            const result = await authClient.signOut();
            if (result.error || !result.data?.success) {
                throw new Error(result.error?.message || "Unable to log out. Please try again.");
            }
            setOpen(false);
            toast.success("Logged Out Successfully");
            router.push("/");
            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Unable to log out. Please try again.");
        } finally {
            setPending(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(nextOpen) => { if (!pending) setOpen(nextOpen); }}>
            <DialogTrigger render={<Button className={`h-11 cursor-pointer rounded-md bg-carecircle-button px-3 text-sm font-semibold text-carecircle-text hover:bg-carecircle-button/80 ${className}`} />}>
                Logout
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm bg-carecircle-button">
                <DialogHeader>
                    <DialogTitle>Logout</DialogTitle>
                    <DialogDescription className="text-slate-600">
                        Are you sure you want to log out?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-carecircle-primary">
                    <DialogClose className={`cursor-pointer`} render={<Button disabled={pending} variant="outline" />}>Cancel</DialogClose>
                    <Button disabled={pending} aria-busy={pending} onClick={handleLogout} className="bg-carecircle-hyper text-white cursor-pointer hover:bg-carecircle-hyper/90">
                        {pending && <LoaderCircle className="size-4 cursor-pointer animate-spin" aria-hidden="true" />}
                        {pending ? "Logging out…" : "Logout"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
