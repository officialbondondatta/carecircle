import AuthButtons from "@/components/auth/AuthButtons";
import { Lightbulb } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="bg-carecircle-secondary">
            <main className="max-w-7xl mx-auto py-5 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-carecircle-primary">Care Circle</h2>
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