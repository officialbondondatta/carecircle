import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const EventDetailsSkeleton = () => {
    return (
        <main role="status" className="mx-auto w-full max-w-3xl px-5 py-10">
            <span className="sr-only">Loading event details…</span>
            <div aria-hidden="true">
                <Skeleton className="mb-5 h-5 w-48" />
                <Card className="border-carecircle-primary/15 bg-carecircle-secondary shadow-none">
                    <Skeleton className="aspect-video w-full rounded-none" />
                    <CardHeader>
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-9 w-4/5" />
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-5 w-3/5" />
                            <Skeleton className="h-5 w-44" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                        <Skeleton className="mx-auto h-10 w-40" />
                    </CardContent>
                </Card>
            </div>
        </main>
    );
};

export default EventDetailsSkeleton;
