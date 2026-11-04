import { IEvent } from "@/lib/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { DetailsProps } from "@/app/(events)/view-details/[id]/page";
import JoinEventButton, { IJoinedEventsProps } from "../auth/JoinEventButton";
import { Suspense } from "react";
import { Button } from "../ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const EventDetails = async ({ params }: DetailsProps) => {
    const { id } = await params;
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const currentUser = session?.user
    const response = await fetch(`${process.env.NEXT_PUBLIC_CIRCLESERVER}/all-events`);
    if (!response.ok) throw new Error("Unable to load event details.");
    const events: IEvent[] = await response.json();
    const event = events.find((item) => item._id === id);
    if (!event) notFound();
    const date = new Date(event.eventDate);
    const formattedDate = Number.isNaN(date.getTime()) ? event.eventDate : new Intl.DateTimeFormat("en-GB", {
        day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dhaka",
    }).format(date);

    const userRes = await fetch(`${process.env.NEXT_PUBLIC_CIRCLESERVER}/user/${event?.userEmail}`)
    const user = await userRes.json()

    let isJoined = false

    const allJoinedEventsRes = await fetch(`${process.env.NEXT_PUBLIC_CIRCLESERVER}/join-event/${currentUser?.email}`)

    const joinedEvents = await allJoinedEventsRes.json()

    const checkJoining = joinedEvents.some((joined: IJoinedEventsProps) => joined.event._id.toString() === event._id.toString())

    if (checkJoining) {
        isJoined = true
    }

    return (
        <main className="mx-auto w-full max-w-3xl px-5 py-10">
            <Link href="/upcoming-event" className="mb-5 inline-block text-sm text-carecircle-primary hover:underline">← Back to upcoming events</Link>
            <Card className="border-carecircle-primary/15 bg-carecircle-secondary text-carecircle-text shadow-none">
                {event.image && <div className="relative aspect-video"><Image src={event.image} alt={event.title} fill loading="eager" unoptimized sizes="(min-width: 768px) 728px, 100vw" className="object-cover" /></div>}
                <CardHeader>
                    <p className="text-sm text-carecircle-primary">{event.eventType === "BloodDonation" ? "Blood Donation" : event.eventType}</p>
                    <CardTitle className="text-3xl text-carecircle-primary">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                    <div className="space-y-2 text-sm">
                        <p><strong>Date:</strong> <time dateTime={event.eventDate}>{formattedDate}</time></p>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p><strong>Created By:</strong> {user.name}</p>
                    </div>
                    <p className="whitespace-pre-wrap wrap-break-word leading-relaxed">{event.description}</p>
                    <div className="self-center flex items-center justify-center">
                        {
                            isJoined ?
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