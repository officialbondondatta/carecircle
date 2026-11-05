"use client"
import Link from "next/link";
import { Button } from "../ui/button";
import { useSession } from "@/lib/auth-client";
import UserDropDown from "./UserDropDown";
import LogoutButton from "./LogoutButton";

const AuthButtons = ({ placement }: { placement?: "account" | "menu" }) => {
    const { data: session, isPending } = useSession()
    if (isPending) {
        if (placement === "menu") return null;
        if (placement === "account") return <div role="status" aria-label="Loading account" className="size-8 animate-pulse rounded-full bg-gray-200 sm:size-10 lg:size-11" />;
        return (
            <div
                className="flex gap-3"
                role="status"
                aria-label="Loading account"
            >
                <div className="h-10 w-24 animate-pulse rounded bg-gray-200" />
                <div className="h-10 w-24 animate-pulse rounded bg-gray-200" />
            </div>
        );
    }

    const user = session?.user
    if (placement === "account" && !user) return null;
    if (placement === "menu" && user) return <LogoutButton className="lg:hidden" />;

    return (
        <div className="flex gap-3">
            {
                user ?
                    <UserDropDown user={user}></UserDropDown>
                    :
                    <>
                        <Link href={"/signin"}>
                            <Button className={`bg-carecircle-button hover:scale-105 hover:bg-carecircle-button cursor-pointer text-sm text-carecircle-text rounded-xs py-1 px-2 font-semibold`}>Login</Button>
                        </Link>
                        <Link href={'/signup'}>
                            <Button className={`bg-carecircle-primary cursor-pointer hover:scale-105 hover:bg-carecircle-primary text-sm text-white rounded-xs py-1 px-2 font-semibold`}>Register</Button>
                        </Link>
                    </>

            }

        </div>
    );
};

export default AuthButtons;