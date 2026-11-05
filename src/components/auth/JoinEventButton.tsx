"use client"
import { useSession } from '@/lib/auth-client';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { IEvent } from '@/lib/types';
import { getTokenFromClient } from '@/lib/getTokenFromClient';

export interface IJoinedEventsProps {
    joinedUserEmail: string,
    event: IEvent,
}
export interface IJoinEventButtonProps {
    event: IEvent,
}

const JoinEventButton = ({ event }: IJoinEventButtonProps) => {
    const { data: session } = useSession()
    const activeUser = session?.user
    const joinedUserEmail = activeUser?.email
    const router = useRouter()

    const handleJoinEvent = async () => {
        if (!activeUser) {
            toast.warning("Login to join event")
            router.push("/signin")
            return
        }

        const joinInfo = {
            joinedUserEmail,
            event
        }
        const token = await getTokenFromClient()
        const res = await fetch(`${process.env.NEXT_PUBLIC_CIRCLESERVER}/join-event`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(joinInfo)
        })
        const result = await res.json()
        if (result.insertedId) {
            toast.success("Joined the event successfully")
            router.refresh()
        }
    }
    return (
        <Button onClick={handleJoinEvent} className={`bg-carecircle-button text-carecircle-primary font-bold py-5 px-8 hover:bg-carecircle-button hover:scale-105 cursor-pointer`}> Join Event</Button>
    );
};

export default JoinEventButton;