import EventCard from "@/components/events/EventCard";
import EventCardSkeleton from "@/components/events/EventCardSkeleton";
import EmptyEvents from "@/components/events/EmptyEvents";
import { auth } from "@/lib/auth";
import { IEvent } from "@/lib/types";
import { headers } from "next/headers";
import { Suspense } from "react";

const ManageEventContent = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const userEmail = session?.user?.email
    const res = await fetch(`${process.env.NEXT_PUBLIC_CIRCLESERVER}/manage-events/${userEmail}`, {
        cache: 'no-store'
    })
    if (!res.ok) {
        throw new Error("Unable to load events.")
    }
    const events: IEvent[] = await res.json()

    if (events.length === 0) {
        return <EmptyEvents title="No events to manage yet" description="You haven’t created any events. Start one and bring your community together." href="/create-event" buttonText="Create an Event" />
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map(event => (
                <Suspense key={event._id} fallback={<EventCardSkeleton />}>
                    <EventCard event={event} showButtons={true} />
                </Suspense>
            ))}
        </div>
    );
};

export default function ManageEventPage() {
    return (
        <main className="mt-10 p-5 lg:p-0">
            <header className="mb-10 text-center lg:mb-15">
                <h2 className="text-3xl">Manage Events</h2>
                <p>Organize local activities, help your neighbors, and make your village a better place for everyone.</p>
            </header>
            <section className="mx-auto max-w-7xl">
                <Suspense fallback={
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map(item => <EventCardSkeleton key={item} />)}
                    </div>
                }>
                    <ManageEventContent />
                </Suspense>
            </section>
        </main>
    );
}
