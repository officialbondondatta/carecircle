import EventDetails from "@/components/events/EventDetails";
import EventDetailsSkeleton from "@/components/events/EventDetailsSkeleton";
import { Suspense } from "react";

export type DetailsProps = { params: Promise<{ id: string }> };



export default function EventDetailsPage(props: DetailsProps) {
    return <Suspense
        fallback={<EventDetailsSkeleton />}>
        <EventDetails {...props}></EventDetails>
    </Suspense>;
}
