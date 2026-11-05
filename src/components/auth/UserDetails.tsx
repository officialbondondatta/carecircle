"use client";

import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { IUserProps } from '@/lib/types';
import { DropdownMenuTrigger } from '../ui/dropdown-menu';

import LogoutButton from "./LogoutButton";

interface UserDetailsProps extends React.ComponentProps<"div"> {
    user: IUserProps;
}

const UserDetails = ({ user, ...props }: UserDetailsProps) => {

    return (
        <div {...props} className="flex gap-1 items-center sm:gap-2">
            <Tooltip>
                <TooltipTrigger render={<DropdownMenuTrigger />} aria-label="Open user menu" className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-carecircle-primary focus-visible:ring-offset-2">
                    <Avatar className={`size-8 shrink-0 cursor-pointer sm:size-10 lg:size-11`} >
                        <AvatarImage className={`object-cover`} src={user?.image || undefined} alt={user?.name || "User avatar"} />
                        <AvatarFallback>
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                    </Avatar>
                </TooltipTrigger>
                <TooltipContent className={`bg-carecircle-primary text-white`}>
                    <span >{user?.name}</span>
                </TooltipContent>
            </Tooltip>
            <LogoutButton className="hidden lg:inline-flex" />


        </div>
    );
};

export default UserDetails;
