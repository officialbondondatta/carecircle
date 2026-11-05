import PastEvents from "@/components/events/PastEvents";
import Banner from "@/components/home/Banner";
import Features from "@/components/home/Features";
import Gallery from "@/components/home/Gallery";
import Newsletter from "@/components/home/Newsletter";
import RecentFeaturedEvents from "@/components/home/RecentFeaturedEvents";
import { Suspense } from "react";
import RecentEventsSkeleton from "@/components/home/RecentEventsSkeleton";

export default function Home() {
  return (
    <main>
      <Banner />
      <Features />
      <Suspense fallback={<RecentEventsSkeleton />}>
        <RecentFeaturedEvents />
      </Suspense>
      <Suspense fallback={<RecentEventsSkeleton />}><PastEvents preview /></Suspense>
      <Gallery />
      <Newsletter />
    </main>
  );
}
