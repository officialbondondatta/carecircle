import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyEventsProps {
    title: string;
    description: string;
    href: string;
    buttonText: string;
}

const EmptyEvents = ({ title, description, href, buttonText }: EmptyEventsProps) => (
    <div className="my-6 rounded-xl bg-carecircle-secondary px-6 py-12 text-center">
        <CalendarDays className="mx-auto mb-4 size-10 text-carecircle-primary" aria-hidden="true" />
        <h3 className="text-2xl font-semibold text-carecircle-primary">{title}</h3>
        <p className="mx-auto mt-3 max-w-md text-carecircle-text/75">{description}</p>
        <Button nativeButton={false} render={<Link href={href} />} className="mt-6 h-11 bg-carecircle-primary px-6 text-white hover:bg-carecircle-primary/90">
            {buttonText}
        </Button>
    </div>
);

export default EmptyEvents;
