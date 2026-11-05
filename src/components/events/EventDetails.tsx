import EventImage from "./EventImage";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { DetailsProps } from "@/app/(events)/view-details/[id]/page";
import JoinEventButton, { IJoinedEventsProps } from "../auth/JoinEventButton";
import { Suspense } from "react";
import { Button } from "../ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

import { getToday, isPastEvent } from "@/lib/utils";

const EventDetails = async ({ params }: DetailsProps) => {
    //event-id
    const { id } = await params;

    //user-session
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const currentUser = session?.user



    //single-event
    const response = await fetch(`${process.env.NEXT_PUBLIC_CIRCLESERVER}/all-events/${id}`);
    const event = await response.json()
    const ended = isPastEvent(event.eventDate, getToday())

    //date-format
    const date = new Date(event.eventDate);
    const formattedDate = Number.isNaN(date.getTime()) ? event.eventDate : new Intl.DateTimeFormat("en-GB", {
        day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dhaka",
    }).format(date);


    //getting user details
    const userRes = await fetch(`${process.env.NEXT_PUBLIC_CIRCLESERVER}/user/${event?.userEmail}`, {
        cache: 'no-store'
    })
    const user = await userRes.json()

    let isJoined = false

    if (currentUser && !ended) {
        //token
        const token = await getTokenFromServer()
        const allJoinedEventsRes = await fetch(`${process.env.NEXT_PUBLIC_CIRCLESERVER}/join-event/${currentUser?.email}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        const joinedEvents = await allJoinedEventsRes.json()

        const checkJoining = joinedEvents.some((joined: IJoinedEventsProps) => joined.event._id.toString() === event._id.toString())

        if (checkJoining) {
            isJoined = true
        }
    }

    return (
        <main className="mx-auto w-full max-w-3xl px-5 py-10">
            <Link href={ended ? "/past-events" : "/upcoming-event"} className="mb-5 inline-block text-sm text-carecircle-primary hover:underline">← Back to {ended ? "past" : "upcoming"} events</Link>
            <Card className="border-carecircle-primary/15 bg-carecircle-secondary text-carecircle-text shadow-none">
                <EventImage key={event.image} src={event.image} alt={event.title} sizes="(min-width: 768px) 728px, 100vw" />
                <CardHeader>
                    <p className="text-sm text-carecircle-primary">{event.eventType === "BloodDonation" ? "Blood Donation" : event.eventType}</p>
                    <CardTitle className="text-3xl text-carecircle-primary">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                    <div className="space-y-2 text-sm">
                        <p><strong>Date:</strong> <time dateTime={event.eventDate}>{formattedDate}</time></p>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p><strong>Created By:</strong> {user?.name || "Community organizer"}</p>
                    </div>
                    <p className="whitespace-pre-wrap wrap-break-word leading-relaxed">{event.description}</p>
                    <div className="self-center flex items-center justify-center">
                        {
                            ended ? <p className="rounded-full bg-carecircle-primary/10 px-5 py-3 text-sm font-medium text-carecircle-primary">This event has ended</p> : isJoined ?
                                <Button disabled className={`bg-carecircle-button text-carecircle-primary  font-bold py-5 px-8 hover:bg-carecircle-button hover:scale-105 cursor-not-allowed`}> Already Joined</Button>
                                :
                                <Suspense>
                                    <JoinEventButton event={event}></JoinEventButton>
                                </Suspense>

                        }
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}

export default EventDetails
