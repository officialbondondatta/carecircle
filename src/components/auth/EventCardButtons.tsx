"use client"
import { Edit, Trash, } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const EventCardButtons = () => {
    const handleDeleteEvent = () => {
        console.log("delete event")
    }
    return (
        <div className="flex gap-2 ml-2">
            <Link href={"/signin"}>
                <Button className={`bg-carecircle-button hover:scale-105 hover:bg-carecircle-button cursor-pointer text-lg text-carecircle-text rounded-xs py-5 px-7 font-semibold`}>
                    <span className="flex items-center justify-center gap-1"> <Edit></Edit> Edit</span>
                </Button>
            </Link>
            <Link href={'/signup'}>
                <Button onClick={handleDeleteEvent} className={`bg-carecircle-hyper cursor-pointer hover:scale-105 hover:bg-carecircle-hyper text-lg text-white rounded-xs py-5 px-7 font-semibold`}>
                    <span className="flex items-center justify-center gap-1"> <Trash></Trash>  Delete</span>
                </Button>
            </Link>
        </div>
    );
};

export default EventCardButtons;