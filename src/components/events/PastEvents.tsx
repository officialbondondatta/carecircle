import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { IEvent } from "@/lib/types";
import { filterEventsByPeriod, getToday } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import EventCard from "./EventCard";
import EventCardSkeleton from "./EventCardSkeleton";

export default async function PastEvents({ preview = false }: { preview?: boolean }) {
    await connection();
    const response = await fetch(`${process.env.NEXT_PUBLIC_CIRCLESERVER}/all-events`, { cache: "no-store" });
    if (!response.ok) throw new Error("Unable to load past events.");
    const allEvents: IEvent[] = await response.json();
    const pastEvents = filterEventsByPeriod(allEvents, "past", getToday());
    const events = preview ? pastEvents.slice(0, 6) : pastEvents;

    return (
        <section className={preview ? "mx-auto max-w-7xl px-6 py-14 lg:py-20" : "mx-auto max-w-7xl px-5"} aria-label="Past events">
            {preview && <header className="mb-8 max-w-xl">
                <p className="mb-2 text-sm font-semibold text-carecircle-primary">Care in action</p>
                <h2 className="text-3xl font-bold text-carecircle-primary">Past Events</h2>
                <p className="mt-3 text-carecircle-text/75">A look back at the moments that brought our community together.</p>
            </header>}
            {events.length > 0 ? <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {events.map(event => <Suspense key={event._id} fallback={<EventCardSkeleton />}>
                    <EventCard event={event} ended />
                </Suspense>)}
            </div> : <p className="rounded-xl bg-carecircle-secondary p-8 text-center text-carecircle-text/75">Our community story is just beginning. Past events will appear here once they have ended.</p>}
            {preview && <div className="mt-8 flex justify-center">
                <Button nativeButton={false} render={<Link href="/past-events" />} className="h-11 rounded-full bg-carecircle-button px-6 font-semibold text-carecircle-text hover:bg-carecircle-button/80">
                    View More Past Events <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
            </div>}
        </section>
    );
}
