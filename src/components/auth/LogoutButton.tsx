"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function LogoutButton({ className = "" }: { className?: string }) {
    const handleLogout = async () => {
        const result = await authClient.signOut();
        if (result?.data?.success) {
            toast.success("Logged Out Successfully");
            redirect("/");
        }
    };

    return (
        <Button onClick={handleLogout} className={`h-11 cursor-pointer rounded-md bg-carecircle-button px-3 text-sm font-semibold text-carecircle-text hover:bg-carecircle-button/80 ${className}`}>
            Logout
        </Button>
    );
}
