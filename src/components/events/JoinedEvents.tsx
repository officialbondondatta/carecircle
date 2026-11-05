import { IEvent } from "@/lib/types";
import EventCard from "./EventCard";
import { sortEventsByDate } from "@/lib/utils";
import { Suspense } from "react";
import EventCardSkeleton from "./EventCardSkeleton";
import EmptyEvents from "./EmptyEvents";

export interface IJoinedEventsShowCaseProps {
    joinedUserEmail: string,
    event: IEvent
}

interface IJoinedEventsProps {
    events: IJoinedEventsShowCaseProps[]
}

const JoinedEvents = ({ events }: IJoinedEventsProps) => {
    if (events.length === 0) {
        return <EmptyEvents title="No joined events yet" description="Find an event you care about and join in. Your next chance to make a difference is waiting." href="/upcoming-event" buttonText="Explore Events" />
    }
    const sortedEvents = sortEventsByDate(events.map(({ event }) => event))
    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
            {
                sortedEvents.map((event) => (
                    <Suspense key={event._id} fallback={<EventCardSkeleton />}>
                        <EventCard event={event} showJoinedEventsButtons={true} />
                    </Suspense>
                ))
            }
        </div>
    );
};

export default JoinedEvents;
