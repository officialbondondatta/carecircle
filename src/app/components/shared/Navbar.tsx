import { Button } from "@/components/ui/button";
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
                <div className="flex gap-3">
                    <Button className={`bg-carecircle-button hover:scale-105 hover:bg-carecircle-button cursor-pointer text-lg text-carecircle-text rounded-xs py-5 px-7 font-semibold`}>Login</Button>
                    <Button className={`bg-carecircle-primary cursor-pointer hover:scale-105 hover:bg-carecircle-primary text-lg text-white rounded-xs py-5 px-7 font-semibold`}>Register</Button>
                </div>
            </main>
        </nav>
    );
};

export default Navbar;