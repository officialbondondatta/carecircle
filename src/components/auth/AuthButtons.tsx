"use client"
import Link from "next/link";
import { Button } from "../ui/button";
import { useSession } from "@/lib/auth-client";
import UserDropDown from "./UserDropDown";

const AuthButtons = () => {
    const { data: session, isPending } = useSession()
    if (isPending) {
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
    console.log(user)

    return (
        <div className="flex gap-3">
            {
                user ?
                    <UserDropDown user={user}></UserDropDown>
                    :
                    <>
                        <Link href={"/signin"}>
                            <Button className={`bg-carecircle-button hover:scale-105 hover:bg-carecircle-button cursor-pointer text-lg text-carecircle-text rounded-xs py-5 px-7 font-semibold`}>Login</Button>
                        </Link>
                        <Link href={'/signup'}>
                            <Button className={`bg-carecircle-primary cursor-pointer hover:scale-105 hover:bg-carecircle-primary text-lg text-white rounded-xs py-5 px-7 font-semibold`}>Register</Button>
                        </Link>
                    </>

            }

        </div>
    );
};

export default AuthButtons;