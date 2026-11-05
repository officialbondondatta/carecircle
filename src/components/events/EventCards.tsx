import type { IEvent } from "@/lib/types";
import EventCard from "./EventCard";
import { Suspense } from "react";
import { getToday, sortEventsByDate } from "@/lib/utils";


const EventCards = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CIRCLESERVER}/all-events`)
    const allevents: IEvent[] = await res.json()
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
        return <p className="py-10 text-center text-carecircle-text/70">No upcoming events yet.</p>
    }

    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {
                sortedEvents.map((event) => (

                    <Suspense key={event._id} fallback={<p>Loading...</p>}>
                        <EventCard event={event}  ></EventCard>
                    </Suspense>


                ))
            }
        </div>
    );
};

export default EventCards;
