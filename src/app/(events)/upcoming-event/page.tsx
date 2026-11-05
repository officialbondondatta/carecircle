import EventCards from "@/components/events/EventCards";
import EventCardSkeleton from "@/components/events/EventCardSkeleton";
import { Suspense } from "react";



const upcomingEventPage = () => {


    return (
        <main className="lg:mb-15 mb-5">
            <header className="text-center mt-10 lg:mb-15 mb-10 p-5 lg:p-0">
                <h2 className="text-3xl">Upcoming Events</h2>
                <p>
                    Discover what&apos;s happening in your community. Join local events, connect with neighbors, and be part of positive change.
                </p>
            </header>
            <div className="max-w-7xl mx-auto p-5 lg:p-0">
                <Suspense fallback={
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((item) => <EventCardSkeleton key={item} />)}
                    </div>
                }>
                    <EventCards></EventCards>
                </Suspense>
            </div>
        </main>
    );
};

export default upcomingEventPage;
