import type { EventType } from "./types"

export { cn } from "cn"

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
