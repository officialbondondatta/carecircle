import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
    return (
        <section role="status" className="overflow-hidden rounded-2xl border border-carecircle-primary/10 bg-carecircle-secondary">
            <span className="sr-only">Loading your profile…</span>
            <div aria-hidden="true">
                <div className="flex items-center gap-4 border-b border-carecircle-primary/10 p-6 sm:p-8">
                    <Skeleton className="size-20 shrink-0 rounded-full ring-4 ring-white/60" />
                    <div className="min-w-0 flex-1 space-y-2">
                        <Skeleton className="h-7 w-40 max-w-full" />
                        <Skeleton className="h-5 w-56 max-w-full" />
                    </div>
                </div>
                <div className="space-y-5 p-6 sm:p-8">
                    {[0, 1, 2].map((field) => (
                        <div key={field} className="space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-11 w-full" />
                            {field > 0 && <Skeleton className="h-4 w-3/4" />}
                        </div>
                    ))}
                    <Skeleton className="h-11 w-full rounded-full sm:w-40" />
                </div>
            </div>
        </section>
    );
}
