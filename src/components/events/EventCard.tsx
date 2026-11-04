import type { IEvent, IUserProps } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import EventCardButtons from "../auth/EventCardButtons";

interface IEventCardProps {
    event: IEvent,
    showButtons?: boolean,
}

const EventCard = async ({ event, showButtons }: IEventCardProps) => {
    const { title, description, eventDate, eventType, image, location, userEmail } = event;
    const res = await fetch(`${process.env.NEXT_PUBLIC_CIRCLESERVER}/user/${userEmail}`)
    const user: IUserProps = await res.json()
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const activeUser = session?.user
    const activeUserEmail = activeUser?.email

    const isUserActive = userEmail === activeUserEmail
    const { name } = user
    const userName = name.split(" ")[0].toLocaleLowerCase()
    const date = new Date(eventDate);
    const formattedDate = Number.isNaN(date.getTime()) ? eventDate : new Intl.DateTimeFormat("en-GB", {
        day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Dhaka",
    }).format(date);
    const typeLabel = eventType;

    return (
        <Card className="h-full border-carecircle-primary/15 bg-carecircle-secondary text-carecircle-text shadow-none">
            {image && (
                <div className="relative aspect-video bg-carecircle-primary/10">
                    <Image src={image} alt={title} fill unoptimized sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" loading="eager" className="object-cover" />
                </div>
            )}
            <CardHeader>
                <div className="flex gap-2">
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
            <CardFooter>
                <Link href={`/view-details/${event._id}`}>
                    <Button className="h-10 rounded-xs w-full cursor-pointer bg-carecircle-primary text-white hover:bg-carecircle-primary/90">
                        View Event
                    </Button>
                </Link>
                {
                    isUserActive && showButtons &&
                    <EventCardButtons event={event}></EventCardButtons>
                }
            </CardFooter>
        </Card>
    );
};

export default EventCard;
