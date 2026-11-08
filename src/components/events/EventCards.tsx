import type { IEvent } from "@/lib/types";
import EventCard from "./EventCard";
import EventCardSkeleton from "./EventCardSkeleton";
import EmptyEvents from "./EmptyEvents";
import { Suspense } from "react";
import { getToday, sortEventsByDate } from "@/lib/utils";


const EventCards = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CIRCLESERVER}/all-events`)
    if (!res.ok) throw new Error("Unable to load upcoming events.")
    const allevents: IEvent[] = await res.json()
    if (!Array.isArray(allevents)) throw new Error("Invalid events response.")
    const startOfToday = new Date(`${getToday()}T00:00:00+06:00`).getTime()
    const upcomingEvents = allevents.filter((event) =>
        new Date(event.eventDate).getTime() >= startOfToday
    )
    const sortedEvents = sortEventsByDate(upcomingEvents)


    // const session = await auth.api.getSession({
    //     headers: await headers()
    // })
    // const user = session?.user

    if (sortedEvents.length === 0) {
        return <EmptyEvents title="No upcoming events yet" description="Have something in mind? Create an event and invite your community to get involved." href="/create-event" buttonText="Create an Event" />
    }

    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
            {
                sortedEvents.map((event) => (

                    <Suspense key={event._id} fallback={<EventCardSkeleton />}>
                        <EventCard event={event}  ></EventCard>
                    </Suspense>


                ))
            }
        </div>
    );
};

export default EventCards;
