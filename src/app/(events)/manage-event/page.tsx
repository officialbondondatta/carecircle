import { Suspense } from "react";

const ManageEventContent = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CIRCLESERVER}/manage-events`, {
        cache: 'no-store'
    })
    if (!res.ok) {
        throw new Error("Unable to load events.")
    }
    const result = await res.json()
    console.log(`${result.length}`)
    return (
        <main className=" mt-10 lg:p-0 p-5">
            <header className="text-center lg:mb-15 mb-10">
                <h2 className="text-3xl">Manage Events</h2>
                <p>Organize local activities, help your neighbors, and make your village a better place for everyone.</p>
            </header>
            <section className="">

            </section>
        </main>
    );
};

export default function ManageEventPage() {
    return (
        <Suspense fallback={<p role="status" className="mt-10 p-5 text-center">Loading events…</p>}>
            <ManageEventContent />
        </Suspense>
    );
}
