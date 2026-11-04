import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { IEvent } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DetailsProps = { params: Promise<{ id: string }> };

async function EventDetails({ params }: DetailsProps) {
    const { id } = await params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_CIRCLESERVER}/all-events`);
    if (!response.ok) throw new Error("Unable to load event details.");
    const events: IEvent[] = await response.json();
    const event = events.find((item) => item._id === id);
    if (!event) notFound();

    const date = new Date(event.eventDate);
    const formattedDate = Number.isNaN(date.getTime()) ? event.eventDate : new Intl.DateTimeFormat("en-GB", {
        day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dhaka",
    }).format(date);

    return (
        <main className="mx-auto w-full max-w-3xl px-5 py-10">
            <Link href="/upcoming-event" className="mb-5 inline-block text-sm text-carecircle-primary hover:underline">← Back to upcoming events</Link>
            <Card className="border-carecircle-primary/15 bg-carecircle-secondary text-carecircle-text shadow-none">
                {event.image && <div className="relative aspect-video"><Image src={event.image} alt={event.title} fill unoptimized sizes="(min-width: 768px) 728px, 100vw" className="object-cover" /></div>}
                <CardHeader>
                    <p className="text-sm text-carecircle-primary">{event.eventType === "BloodDonation" ? "Blood Donation" : event.eventType}</p>
                    <CardTitle className="text-3xl text-carecircle-primary">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                    <div className="space-y-2 text-sm">
                        <p><strong>Date:</strong> <time dateTime={event.eventDate}>{formattedDate}</time></p>
                        <p><strong>Location:</strong> {event.location}</p>
                    </div>
                    <p className="whitespace-pre-wrap wrap-break-word leading-relaxed">{event.description}</p>
                </CardContent>
            </Card>
        </main>
    );
}

export default function EventDetailsPage(props: DetailsProps) {
    return <Suspense fallback={<p role="status" className="p-10 text-center">Loading event details…</p>}><EventDetails {...props} /></Suspense>;
}
