import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
    return (
        <section className="mx-auto max-w-7xl px-6 py-14 lg:py-20" aria-labelledby="newsletter-heading">
            <div className="rounded-2xl bg-carecircle-secondary px-6 py-10 text-center md:px-12">
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-carecircle-button">
                    <Mail className="size-6 text-carecircle-primary" aria-hidden="true" />
                </div>
                <h2 id="newsletter-heading" className="text-3xl font-bold text-carecircle-primary">Stay in the circle</h2>
                <p className="mx-auto mt-3 max-w-lg text-carecircle-text/75">Get community updates, upcoming events, and new ways to make a difference delivered to your inbox.</p>
                <div className="mx-auto mt-6 flex max-w-lg flex-col gap-3 sm:flex-row">
                    <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                    <Input id="newsletter-email" name="email" type="email" autoComplete="email" placeholder="Enter your email address" className="h-11 border-carecircle-primary/20 bg-white" />
                    <Button type="button" className="h-11 bg-carecircle-primary px-6 text-white hover:bg-carecircle-primary/90">Subscribe</Button>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
