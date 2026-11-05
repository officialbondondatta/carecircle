import { Suspense } from "react";
import PastEvents from "@/components/events/PastEvents";
import EventCardSkeleton from "@/components/events/EventCardSkeleton";

export default function PastEventsPage() {
    return (
        <main className="mb-5 lg:mb-15">
            <header className="mx-auto my-10 max-w-2xl px-5 text-center lg:mb-15">
                <h1 className="text-3xl text-carecircle-primary">Past Events</h1>
                <p className="mt-3 text-carecircle-text/75">Explore the moments that brought our neighbors together and made a difference in our community.</p>
            </header>
            <Suspense fallback={<div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-5 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map(item => <EventCardSkeleton key={item} />)}
            </div>}>
                <PastEvents />
            </Suspense>
        </main>
    );
}
