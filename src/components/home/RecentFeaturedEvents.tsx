import { Suspense } from "react";
import EventCard from "../events/EventCard";
import { IEvent } from "@/lib/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const RecentFeaturedEvents = async () => {
    const result = await fetch(`${process.env.NEXT_PUBLIC_CIRCLESERVER}/featured-section`, {
        cache: "no-store"
    })
    if (!result.ok) throw new Error("Unable to load featured events.")
    const events: IEvent[] = await result.json()
    return (
        <section className="mx-auto max-w-7xl px-6 py-14 lg:py-20" aria-labelledby="featured-events-heading">
            <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-xl">
                    <p className="mb-2 text-sm font-semibold text-carecircle-primary">Get involved</p>
                    <h2 id="featured-events-heading" className="text-3xl font-bold text-carecircle-primary">Find your next way to give back</h2>
                    <p className="mt-3 text-carecircle-text/75">Explore featured community events and join neighbors who are making a difference.</p>
                </div>
                <Link href="/upcoming-event" className="inline-flex w-fit shrink-0 items-center gap-2 py-2 font-semibold text-carecircle-primary underline-offset-4 hover:underline">
                    View all events <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
            </header>
            {events.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <Suspense key={event._id} fallback={<p role="status" className="p-5">Loading event…</p>}>
                            <EventCard event={event} />
                        </Suspense>
                    ))}
                </div>
            ) : (
                <p className="rounded-xl bg-carecircle-secondary p-8 text-center text-carecircle-text/75">No featured events yet. Check back soon for ways to get involved.</p>
            )}
        </section>
    );
};

export default RecentFeaturedEvents;
