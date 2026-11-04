"use client"
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { EventType } from "@/lib/types";

import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const getToday = () => {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Dhaka",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(new Date())
    const value = (type: string) => parts.find((part) => part.type === type)?.value
    return `${value("year")}-${value("month")}-${value("day")}`
}

const CreateEventPage = () => {
    const router = useRouter()
    const [pending, setPending] = useState(false)
    const [error, setError] = useState("")
    const eventTypes: { value: EventType; label: string }[] = [
        { value: "Sports", label: "Sports" },
        { value: "Awareness", label: "Awareness" },
        { value: "BloodDonation", label: "Blood Donation" },
        { value: "Cleanup", label: "Cleanup" },
        { value: "Donation", label: "Donation" },
        { value: "Fundraising", label: "Fundraising" },
        { value: "Plantation", label: "Plantation" }
    ]
    const handleCreateEvent = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setPending(true)
        try {
            const form = e.currentTarget
            const data = new FormData(form)
            const eventDate = data.get("eventDate")
            if (typeof eventDate !== "string" || !eventDate || eventDate < getToday()) {
                setError("Please select today or a future date.")
                return
            }
            const eventData = Object.fromEntries(data.entries())
            console.log(eventData)
            form.reset()
            router.refresh()
        } catch {
            setError("Unable to prepare the event. Please try again.")
        } finally {
            setPending(false)

        }
    }
    return (
        <main className=" mt-10 lg:p-0 p-5">
            <header className="text-center lg:mb-15 mb-10">
                <h2 className="text-3xl">Create Event</h2>
                <p>Fill in the details below to create a new event.</p>
            </header>
            <section className="">
                <form onSubmit={handleCreateEvent} className="bg-carecircle-secondary py-8 px-5 space-y-5 max-w-3xl mx-auto" aria-busy={pending}>
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-medium">Event Title</label>
                        <Input id="title" name="title" type="text" autoComplete="title" placeholder="Event Title" required disabled={pending} className="border-carecircle-primary/20 bg-white focus-visible:border-carecircle-primary focus-visible:ring-carecircle-primary/20" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium">Description</label>
                        <Input id="description" name="description" type="text" autoComplete="description" placeholder="Enter Event Description" required disabled={pending} className="border-carecircle-primary/20 bg-white focus-visible:border-carecircle-primary focus-visible:ring-carecircle-primary/20" />
                    </div>
                    <div className="space-y-2">
                        <Field >
                            <FieldLabel htmlFor="eventType">Event Type</FieldLabel>
                            <Select items={eventTypes} name="eventType" required disabled={pending}>
                                <SelectTrigger className="bg-white" id="eventType">
                                    <SelectValue placeholder="Select an event type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {eventTypes.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="image" className="block text-sm font-medium">Event Thumbnail URL</label>
                        <Input id="image" name="image" type="url" placeholder="Enter Event Thumbnail URL" required disabled={pending} className="border-carecircle-primary/20 bg-white focus-visible:border-carecircle-primary focus-visible:ring-carecircle-primary/20" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="location" className="block text-sm font-medium">Location</label>
                        <Input id="location" name="location" type="text" autoComplete="location" placeholder="Enter Event Location" required disabled={pending} className="border-carecircle-primary/20 bg-white focus-visible:border-carecircle-primary focus-visible:ring-carecircle-primary/20" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="date" className="block text-sm font-medium">Event Date</label>
                        <Input id="date" name="eventDate" type="date" min={getToday()} onFocus={(event) => { event.currentTarget.min = getToday() }} required disabled={pending} className="border-carecircle-primary/20 bg-white focus-visible:border-carecircle-primary focus-visible:ring-carecircle-primary/20" />
                    </div>
                    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
                    <Button type="submit" disabled={pending} className="h-11 cursor-pointer w-full rounded-full bg-carecircle-button text-carecircle-text hover:bg-carecircle-button/80">
                        {pending && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
                        {pending ? "Creating Event" : "Create Event"}
                    </Button>
                </form>
            </section>
        </main>
    );
};

export default CreateEventPage;
