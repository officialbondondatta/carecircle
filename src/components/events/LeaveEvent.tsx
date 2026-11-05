"use client"
import { IEvent } from "@/lib/types";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { SquareArrowRightExit } from "lucide-react";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const LeaveEvent = ({ event }: { event: IEvent }) => {
    const router = useRouter()
    const handleLeaveEvent = async () => {
        const token = await getTokenFromClient()
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_CIRCLESERVER}/join-event/${event._id}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            const result = await res.json()
            if (result.deletedCount > 0) {
                toast.success("Left the event Successfully")
                router.refresh()
            }
        } catch (error) {
            toast.error(
                error instanceof Error ?
                    error.message : "Something went wrong"
            )
        }
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger render={<Button className={`bg-carecircle-hyper cursor-pointer hover:scale-105 hover:bg-carecircle-hyper text-sm text-white rounded-xs py-5 px-5 font-semibold`}>
                    <span className="flex items-center justify-center gap-1"> <SquareArrowRightExit></SquareArrowRightExit>  Leave Event</span>
                </Button>} />
                <DialogContent className="sm:max-w-sm bg-carecircle-button">
                    <DialogHeader>
                        <DialogTitle>Leave Event</DialogTitle>
                        <h2 className="text-xl font-bold">{event?.title}</h2>
                        <div className="flex gap-2">
                            <span className="bg-carecircle-secondary text-xs self-start px-3 py-1">{event.eventType}</span>
                            <span className="bg-carecircle-secondary text-xs self-start px-3 py-1">{event.eventDate}</span>
                        </div>
                        <DialogDescription>
                            Are you sure you want to leave this event? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className={`bg-carecircle-primary`}>
                        <DialogClose render={<Button variant="outline">Cancel</Button>} />
                        <Button onClick={handleLeaveEvent} className={`bg-carecircle-hyper hover:bg-carecircle-hyper hover:scale-105 cursor-pointer text-white`}> <span className="flex items-center justify-center gap-1"> <SquareArrowRightExit></SquareArrowRightExit>Leave Event </span></Button>
                    </DialogFooter>
                </DialogContent>

            </Dialog>
        </div>
    );
};

export default LeaveEvent;
