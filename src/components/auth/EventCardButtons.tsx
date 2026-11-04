"use client"
import { Trash, } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import EditEvent from "../events/EditEvent";
import { IEvent } from "@/lib/types";

const EventCardButtons = ({ event }: { event: IEvent }) => {

    return (
        <div className="flex gap-2 ml-2">

            <EditEvent event={event}></EditEvent>

            <Link href={'/signup'}>
                <Button className={`bg-carecircle-hyper cursor-pointer hover:scale-105 hover:bg-carecircle-hyper text-lg text-white rounded-xs py-5 px-7 font-semibold`}>
                    <span className="flex items-center justify-center gap-1"> <Trash></Trash>  Delete</span>
                </Button>
            </Link>
        </div>
    );
};

export default EventCardButtons;