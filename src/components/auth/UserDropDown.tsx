"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import UserDetails from "./UserDetails";
import { IUserProps } from "@/lib/types";
import Link from "next/link";


const UserDropDown = ({ user }: { user: IUserProps }) => {

    return (
        <DropdownMenu>
            <UserDetails user={user} />
            <DropdownMenuContent className={`min-w-50`}>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>
                        <p className="flex flex-col">
                            <span>
                                {user?.name}
                            </span>
                            <span>
                                {user?.email}
                            </span>
                        </p>
                    </DropdownMenuLabel>
                    <DropdownMenuItem >
                        <Link href="/my-profile">
                            My Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link href={"/create-event"}>Create Event</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link href={"/manage-event"}>Manage Events</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link href={"/joined-event"}>Joined Events</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropDown;
