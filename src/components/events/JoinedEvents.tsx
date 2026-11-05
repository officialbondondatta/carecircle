import { IEvent } from "@/lib/types";
import EventCard from "./EventCard";
import { sortEventsByDate } from "@/lib/utils";

export interface IJoinedEventsShowCaseProps {
    joinedUserEmail: string,
    event: IEvent
}

interface IJoinedEventsProps {
    events: IJoinedEventsShowCaseProps[]
}

const JoinedEvents = ({ events }: IJoinedEventsProps) => {
    const sortedEvents = sortEventsByDate(events.map(({ event }) => event))
    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
            {
                (events.length === 0) && <div>
                    <h2 className="text-center">No joined events to show !</h2>
                </div>
            }
            {
                sortedEvents.map((event) => (
                    <EventCard key={event._id} event={event} showJoinedEventsButtons={true}></EventCard>
                ))
            }
        </div>
    );
};

export default JoinedEvents;
