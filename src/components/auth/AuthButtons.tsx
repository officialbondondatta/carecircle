"use client"
import Link from "next/link";
import { Button } from "../ui/button";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
const AuthButtons = () => {
    const { data: session } = useSession()
    const user = session?.user
    console.log(user)
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
                    <div className="flex gap-2 items-center">
                        <Tooltip>
                            <TooltipTrigger>
                                <Avatar className={`size-11 shrink-0 cursor-pointer`} >
                                    <AvatarImage className={`object-cover`} src={user?.image || "https://i.ibb.co.com/KcckVn5v/lucifer-style-avatar.png"} alt={`user?.name || 'user avatar`} />
                                    <AvatarFallback>
                                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </TooltipTrigger>
                            <TooltipContent className={`bg-carecircle-primary text-white`}>
                                <span >{user?.name}</span>
                            </TooltipContent>
                        </Tooltip>

                        <Button onClick={handleLogout} className={`bg-carecircle-button hover:scale-105 hover:bg-carecircle-button cursor-pointer text-lg text-carecircle-text rounded-xs py-5 px-7 font-semibold`}>Logout</Button>

                    </div>
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