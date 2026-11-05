"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { getTokenFromClient } from "@/lib/getTokenFromClient";

import { IEvent } from "@/lib/types";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DeleteEvent = ({ event }: { event: IEvent }) => {
    const router = useRouter()
    const handleDeleteEvent = async () => {
        try {
            const token = await getTokenFromClient()
            const res = await fetch(`${process.env.NEXT_PUBLIC_CIRCLESERVER}/delete-event/${event?._id}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            const result = await res.json()
            if (result.deletedCount > 0) {
                toast.success("Event Deleted Successfully")
                router.refresh()
            }
        } catch (error) {
            toast.error(
                error instanceof Error ?
                    error.message :
                    "Something Went Wrong"
            )
        }
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger render={<Button className={`bg-carecircle-hyper cursor-pointer hover:scale-105 hover:bg-carecircle-hyper text-lg text-white rounded-xs py-5 px-7 font-semibold`}>
                    <span className="flex items-center justify-center gap-1"> <Trash></Trash>  Delete</span>
                </Button>} />
                <DialogContent className="sm:max-w-sm bg-carecircle-button">
                    <DialogHeader>
                        <DialogTitle >Delete Event</DialogTitle>
                        <h2 className="text-xl font-bold">{event?.title}</h2>
                        <div className="flex gap-2">
                            <span className="bg-carecircle-secondary text-xs self-start px-3 py-1">{event.eventType}</span>
                            <span className="bg-carecircle-secondary text-xs self-start px-3 py-1">{event.eventDate}</span>
                        </div>
                        <DialogDescription>
                            Are you sure you want to delete this event? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className={`bg-carecircle-primary`}>
                        <DialogClose render={<Button variant="outline">Cancel</Button>} />
                        <Button onClick={handleDeleteEvent} className={`bg-carecircle-hyper text-white`}> <span className="flex items-center justify-center gap-1"> <Trash></Trash>  Delete Event </span></Button>
                    </DialogFooter>
                </DialogContent>

            </Dialog>
        </div>
    );
};

export default DeleteEvent;