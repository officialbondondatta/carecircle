"use client"
import { useSession } from '@/lib/auth-client';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { IEvent } from '@/lib/types';
import { getTokenFromClient } from '@/lib/getTokenFromClient';
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';

export interface IJoinedEventsProps {
    joinedUserEmail: string,
    event: IEvent,
}
export interface IJoinEventButtonProps {
    event: IEvent,
}

const JoinEventButton = ({ event }: IJoinEventButtonProps) => {
    const { data: session, isPending } = useSession()
    const [joining, setJoining] = useState(false)
    const [joined, setJoined] = useState(false)
    const activeUser = session?.user
    const joinedUserEmail = activeUser?.email
    const router = useRouter()

    const handleJoinEvent = async () => {
        if (joining || joined || isPending) return
        if (!activeUser) {
            toast.warning("Login to join event")
            router.push("/signin")
            return
        }

        const joinInfo = {
            joinedUserEmail,
            event
        }
        setJoining(true)
        try {
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
            if (!res.ok || !result.insertedId) {
                throw new Error(result.message || result.msg || "Unable to join the event. Please try again.")
            }
            if (result.insertedId) {
                setJoined(true)
                toast.success("Joined the event successfully")
                router.refresh()
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Unable to join the event. Please try again.")
        } finally {
            setJoining(false)
        }
    }
    return (
        <Button disabled={joining || joined || isPending} aria-busy={joining} onClick={handleJoinEvent} className={`bg-carecircle-button text-carecircle-primary font-bold py-5 px-8 hover:bg-carecircle-button hover:scale-105 cursor-pointer`}>
            {joining && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
            {joining ? "Joining event…" : joined ? "Already Joined" : "Join Event"}
        </Button>
    );
};

export default JoinEventButton;
