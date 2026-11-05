import JoinedEvents, { IJoinedEventsShowCaseProps } from "@/components/events/JoinedEvents";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const JoinedEventList = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user
    if (!user) redirect("/signin")
    const res = await fetch(`${process.env.NEXT_PUBLIC_CIRCLESERVER}/join-event/${(user.email)}`, {
        cache: "no-store"
    })
    if (!res.ok) throw new Error("Unable to load joined events.")
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
            <div className="max-w-7xl mx-auto">
                <Suspense fallback={<p role="status">Loading joined events…</p>}>
                    <JoinedEventList />
                </Suspense>
            </div>
        </div>
    );
};

export default JoinedEventPage;
