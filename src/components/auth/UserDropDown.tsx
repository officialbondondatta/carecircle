import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserDetails from "./UserDetails";
import { IUserProps } from "@/lib/types";
import Link from "next/link";

const UserDropDown = ({ user }: { user: IUserProps }) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<UserDetails user={user}></UserDetails>} />
            <DropdownMenuContent>
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