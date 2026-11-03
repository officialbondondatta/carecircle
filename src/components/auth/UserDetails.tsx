import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { IUserProps } from '@/lib/types';

interface UserDetailsProps extends React.ComponentProps<"div"> {
    user: IUserProps;
}

const UserDetails = ({ user, ...props }: UserDetailsProps) => {

    const handleLogout = async () => {
        const result = await authClient.signOut()
        if (result?.data?.success) {
            toast.success("Logged Out Successfully")
        }
    }
    return (
        <div {...props} className="flex gap-2 items-center">
            <Tooltip>
                <TooltipTrigger>
                    <Avatar className={`size-11 shrink-0 cursor-pointer`} >
                        <AvatarImage className={`object-cover`} src={user?.image || "https://i.ibb.co.com/KcckVn5v/lucifer-style-avatar.png"} alt={user?.name || "User avatar"} />
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
    );
};

export default UserDetails;