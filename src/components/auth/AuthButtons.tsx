"use client"
import Link from "next/link";
import { Button } from "../ui/button";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

const AuthButtons = () => {
    const { data: session } = useSession()
    const user = session?.user
    const handleLogout = async () => {
        const result = await authClient.signOut()
        if (result?.data?.success) {
            toast.success("Logged Out Successfully")
        }
    }
    return (
        <div className="flex gap-3">
            {
                user ?
                    <>
                        <Link href={"/signin"}>
                            <Button onClick={handleLogout} className={`bg-carecircle-button hover:scale-105 hover:bg-carecircle-button cursor-pointer text-lg text-carecircle-text rounded-xs py-5 px-7 font-semibold`}>Logout</Button>
                        </Link>
                    </>
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