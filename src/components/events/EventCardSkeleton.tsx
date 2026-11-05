import { Skeleton } from "@/components/ui/skeleton";

const EventCardSkeleton = () => {
    return (
        <div role="status" className="overflow-hidden rounded-xl border border-carecircle-primary/15 bg-carecircle-secondary">
            <span className="sr-only">Loading event…</span>
            <div aria-hidden="true">
                <Skeleton className="aspect-video w-full rounded-none" />
                <div className="space-y-4 p-5">
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-7 w-4/5" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                    <Skeleton className="h-5 w-2/5" />
                    <Skeleton className="h-5 w-3/5" />
                    <Skeleton className="h-10 w-28" />
                </div>
            </div>
        </div>
    );
};

export default EventCardSkeleton;
