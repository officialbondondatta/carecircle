import Banner from "@/components/home/Banner";
import Features from "@/components/home/Features";
import Gallery from "@/components/home/Gallery";
import Newsletter from "@/components/home/Newsletter";
import RecentFeaturedEvents from "@/components/home/RecentFeaturedEvents";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Banner />
      <Features />
      <Suspense fallback={<p role="status" className="p-5 text-center">Loading featured events…</p>}>
        <RecentFeaturedEvents />
      </Suspense>
      <Gallery />
      <Newsletter />
    </main>
  );
}
