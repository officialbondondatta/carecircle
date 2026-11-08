"use client";

import Link from "next/link";

// This boundary replaces the root layout, so it must supply its own document.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <html lang="en">
            <body style={{ margin: 0, background: "#faf8ef", color: "#235c43", fontFamily: "system-ui, sans-serif" }}>
                <main style={{ maxWidth: 560, margin: "15vh auto", padding: 24, textAlign: "center" }} role="alert">
                    <h1>CareCircle is temporarily unavailable</h1>
                    <p>We couldn’t load the page. Please try again in a moment.</p>
                    <button onClick={() => reset()} style={{ padding: "12px 24px", cursor: "pointer" }}>Try again</button>
                    <p><Link href="/">Back to Home</Link></p>
                </main>
            </body>
        </html>
    );
}
