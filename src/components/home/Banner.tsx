import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Banner = () => {
    return (
        <section className="relative overflow-hidden bg-carecircle-secondary">
            <Image
                src="https://i.ibb.co.com/1tVYc1c5/homepage-banner-v2.png"
                alt="Community volunteers sharing warm blankets with a neighbor"
                width={2172}
                height={724}
                priority
                sizes="100vw"
                className="h-64 w-full object-cover object-left md:absolute md:inset-0 md:h-full"
            />
            <div className="absolute inset-0 hidden bg-linear-to-r from-carecircle-bg via-carecircle-bg/30 to-transparent md:block" aria-hidden="true" />
            <div className="relative mx-auto flex max-w-7xl md:min-h-120 md:items-center md:justify-start">
                <div className="w-full px-6 py-10 md:max-w-md md:py-16 lg:max-w-lg lg:px-8">
                    <p className="mb-3 text-sm font-semibold text-carecircle-primary">Small acts. Stronger communities.</p>
                    <h1 className="text-4xl font-bold leading-tight text-carecircle-primary lg:text-5xl">A little care can make a big difference.</h1>
                    <p className="mt-4 text-base leading-relaxed text-carecircle-text">Join local events, lend a helping hand, and make your neighborhood a better place together.</p>
                    <Button nativeButton={false} render={<Link href="/upcoming-event" />} className="mt-6 h-11 bg-carecircle-button px-6 font-semibold text-carecircle-text hover:bg-carecircle-button/90">
                        Explore Events
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Banner;
