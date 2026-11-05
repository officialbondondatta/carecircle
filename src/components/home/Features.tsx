import { CalendarDays, CalendarPlus, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
    {
        icon: CalendarDays,
        title: "Discover local events",
        description: "Find upcoming cleanups, donation drives, and community activities near you.",
    },
    {
        icon: Users,
        title: "Join and make a difference",
        description: "Take part in events that matter to you and keep track of everything you’ve joined.",
    },
    {
        icon: CalendarPlus,
        title: "Organize your own events",
        description: "Bring people together. Create an event and manage its details in one place.",
    },
];

const Features = () => {
    return (
        <section className="mx-auto max-w-7xl px-6 py-14 lg:py-20" aria-labelledby="features-heading">
            <header className="mx-auto mb-8 max-w-xl text-center">
                <h2 id="features-heading" className="text-3xl font-bold text-carecircle-primary">Helping your community made simple</h2>
                <p className="mt-3 text-carecircle-text/75">Find a way to give back, connect with others, and turn a little care into action.</p>
            </header>
            <div className="grid gap-5 md:grid-cols-3">
                {features.map(({ icon: Icon, title, description }) => (
                    <Card key={title} className="border-carecircle-primary/10 bg-carecircle-secondary shadow-none">
                        <CardHeader>
                            <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-carecircle-button">
                                <Icon className="size-6 text-carecircle-primary" aria-hidden="true" />
                            </div>
                            <CardTitle className="text-carecircle-primary">{title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm leading-relaxed text-carecircle-text/80">{description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Features;
