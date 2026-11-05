import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileForm from "@/components/auth/ProfileForm";

async function ProfileContent() {
    const session = await auth.api.getSession({
        headers: await headers(),
        query: { disableCookieCache: true },
    });
    if (!session) redirect("/signin");
    return <ProfileForm user={session.user} />;
}

export default function MyProfilePage() {
    return (
        <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 md:py-16">
            <header className="mb-8">
                <h1 className="text-3xl font-semibold text-carecircle-primary">My Profile</h1>
                <p className="mt-2 text-carecircle-text/70">A familiar face makes a community feel closer.</p>
            </header>
            <Suspense fallback={<p role="status" className="rounded-2xl bg-carecircle-secondary p-8">Loading your profile…</p>}>
                <ProfileContent />
            </Suspense>
        </main>
    );
}
