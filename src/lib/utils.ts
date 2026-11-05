import type { EventType, IEvent } from "./types"

export { cn } from "cn"

export const sortEventsByDate = (events: IEvent[]) => {
    return [...events].sort((a, b) => {
        const firstDate = new Date(a.eventDate).getTime()
        const secondDate = new Date(b.eventDate).getTime()
        if (Number.isNaN(firstDate)) return Number.isNaN(secondDate) ? 0 : 1
        if (Number.isNaN(secondDate)) return -1
        return firstDate - secondDate
    })
}

export const getToday = () => {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Dhaka",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(new Date())
    const value = (type: string) => parts.find((part) => part.type === type)?.value
    return `${value("year")}-${value("month")}-${value("day")}`
}

export const eventTypes: { value: EventType; label: string }[] = [
    { value: "Sports", label: "Sports" },
    { value: "Awareness", label: "Awareness" },
    { value: "BloodDonation", label: "Blood Donation" },
    { value: "Cleanup", label: "Cleanup" },
    { value: "Donation", label: "Donation" },
    { value: "Fundraising", label: "Fundraising" },
    { value: "Plantation", label: "Plantation" },
]
