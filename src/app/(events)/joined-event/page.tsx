import JoinedEvents, { IJoinedEventsShowCaseProps } from "@/components/events/JoinedEvents";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import EventCardSkeleton from "@/components/events/EventCardSkeleton";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

const JoinedEventList = async () => {
    const requestHeaders = await headers()
    const session = await auth.api.getSession({
        headers: requestHeaders
    })
    const user = session?.user
    if (!user) redirect("/signin")
    const token = await getTokenFromServer()

    const res = await fetch(`${process.env.NEXT_PUBLIC_CIRCLESERVER}/join-event/${encodeURIComponent(user.email)}`, {
        cache: "no-store",
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    if (!res.ok) {
        throw new Error(`Unable to load joined events (HTTP ${res.status}). Check the backend authentication configuration.`)
    }

    const joinedEvents: IJoinedEventsShowCaseProps[] = await res.json()
    return <JoinedEvents events={joinedEvents} />
};

const JoinedEventPage = () => {
    return (
        <div>
            <header className="text-center lg:mb-15 mt-10 mb-10">
                <h2 className="text-3xl">Joined Events</h2>
                <p>Keep track of the events you&apos;ve joined and stay updated.</p>
            </header>
            <div className="max-w-7xl mx-auto p-5 lg:p-0">
                <Suspense fallback={
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {[1, 2, 3, 4].map(item => <EventCardSkeleton key={item} />)}
                    </div>
                }>
                    <JoinedEventList />
                </Suspense>
            </div>
        </div>
    );
};

export default JoinedEventPage;
