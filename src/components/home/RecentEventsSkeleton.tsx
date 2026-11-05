import EventCardSkeleton from "@/components/events/EventCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const RecentEventsSkeleton = () => {
    return (
        <section role="status" className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
            <span className="sr-only">Loading upcoming events…</span>
            <div aria-hidden="true">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="w-full max-w-xl space-y-3">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-9 w-80 max-w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-2/3" />
                    </div>
                    <Skeleton className="h-6 w-36 shrink-0" />
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((item) => <EventCardSkeleton key={item} />)}
                </div>
            </div>
        </section>
    );
};

export default RecentEventsSkeleton;
