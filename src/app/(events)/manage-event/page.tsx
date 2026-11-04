import EventCard from "@/components/events/EventCard";
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

    return (
        <main className=" mt-10 lg:p-0 p-5">
            <header className="text-center lg:mb-15 mb-10">
                <h2 className="text-3xl">Manage Events</h2>
                <p>Organize local activities, help your neighbors, and make your village a better place for everyone.</p>
            </header>
            <section className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                    {
                        events.map(event => (
                            <Suspense key={event?._id} fallback={<p>Loading...</p>}>
                                <EventCard event={event} showButtons={true}></EventCard>
                            </Suspense>
                        ))
                    }
                </div>

            </section>
        </main>
    );
};

export default function ManageEventPage() {
    return (
        <Suspense fallback={<p role="status" className="mt-10 p-5 text-center">Loading events…</p>}>
            <ManageEventContent />
        </Suspense>
    );
}
