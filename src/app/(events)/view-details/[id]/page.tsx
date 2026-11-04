import EventDetails from "@/components/events/EventDetails";
import { Suspense } from "react";

export type DetailsProps = { params: Promise<{ id: string }> };



export default function EventDetailsPage(props: DetailsProps) {
    return <Suspense
        fallback={<p role="status" className="p-10 text-center">Loading event details…</p>}>
        <EventDetails {...props}></EventDetails>
    </Suspense>;
}
