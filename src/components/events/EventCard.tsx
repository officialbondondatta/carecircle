import { readOptionalResource } from "@/lib/api-response";
import type { IEvent, IUserProps } from "@/lib/types";
import EventImage from "./EventImage";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import EventCardButtons from "../auth/EventCardButtons";
import LeaveEvent from "./LeaveEvent";

interface IEventCardProps {
    event: IEvent,
    showButtons?: boolean,
    ended?: boolean,
    showJoinedEventsButtons?: boolean,
}

const EventCard = async ({ event, showButtons, showJoinedEventsButtons, ended }: IEventCardProps) => {
    const { title, description, eventDate, eventType, image, location, userEmail } = event;
    const res = await fetch(`${process.env.NEXT_PUBLIC_CIRCLESERVER}/user/${encodeURIComponent(userEmail)}`)
    const user = await readOptionalResource<IUserProps>(res)
    const session = showButtons || showJoinedEventsButtons ? await auth.api.getSession({
        headers: await headers()
    }) : null
    const activeUser = session?.user
    const activeUserEmail = activeUser?.email

    const isUserActive = userEmail === activeUserEmail
    const userName = user?.name?.trim().split(/\s+/)[0]?.toLocaleLowerCase() || "Community organizer"
    const date = new Date(eventDate);
    const formattedDate = Number.isNaN(date.getTime()) ? eventDate : new Intl.DateTimeFormat("en-GB", {
        day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Dhaka",
    }).format(date);
    const typeLabel = eventType;

    return (
        <Card className="h-full hover:border-carecircle-button border-carecircle-primary/15 bg-carecircle-secondary text-carecircle-text shadow-none">
            <EventImage key={image} src={image} alt={title} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
            <CardHeader>
                <div className="flex flex-wrap gap-2">
                    {ended && <span className="w-fit rounded-full bg-carecircle-primary/10 px-3 py-1 text-xs font-medium text-carecircle-primary">Ended</span>}
                    <span className="w-fit rounded-full bg-carecircle-button px-3 py-1 text-xs font-medium text-carecircle-primary">{typeLabel}</span>
                    <span className="w-fit rounded-full bg-carecircle-primary px-3 py-1 text-xs font-medium text-carecircle-secondary">{userName}</span>

                </div>
                <CardTitle className="text-carecircle-primary mt-2">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
                <p className="line-clamp-2 text-sm leading-relaxed text-carecircle-text/75">{description}</p>
                <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2"><CalendarDays className="size-4 shrink-0 text-carecircle-primary" aria-hidden="true" /><time dateTime={eventDate}>{formattedDate}</time></p>
                    <p className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-carecircle-primary" aria-hidden="true" /><span className="wrap-break-word">{location}</span></p>
                </div>
            </CardContent>
            <CardFooter className="flex-wrap gap-2">
                <Link href={`/view-details/${event._id}`}>
                    <Button className="h-10 hover:scale-105 rounded-xs w-full cursor-pointer bg-carecircle-primary text-white hover:bg-carecircle-primary/90">
                        View Event
                    </Button>
                </Link>
                {
                    isUserActive && showButtons &&
                    <EventCardButtons event={event}></EventCardButtons>
                }
                {
                    activeUser && showJoinedEventsButtons &&
                    <LeaveEvent event={event}></LeaveEvent>
                }
            </CardFooter>
        </Card>
    );
};

export default EventCard;
