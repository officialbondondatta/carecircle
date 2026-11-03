import AuthButtons from "@/components/auth/AuthButtons";
import { Lightbulb } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="bg-carecircle-secondary">
            <main className="max-w-7xl mx-auto py-5 flex justify-between items-center px-2 lg:px-0">
                <div>
                    <Link href={"/"} className=" relative block h-12 w-45 text-2xl font-bold text-carecircle-primary">
                        <Image
                            src="/carecircle-logo.svg"
                            alt="Care Circle Logo"
                            fill
                            sizes="180px"
                            priority
                            className="object-contain"
                        />
                    </Link>
                </div>
                <div>
                    <Link href={`/upcoming-events`} className="font-bold cursor-pointer text-carecircle-primary">
                        <span className="flex items-center gap-1">
                            <Lightbulb></Lightbulb> Upcoming Events
                        </span>
                    </Link >
                </div>
                <AuthButtons></AuthButtons>
            </main>
        </nav>
    );
};

export default Navbar;