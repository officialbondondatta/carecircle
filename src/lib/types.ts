export interface IUserProps {
    name: string,
    email: string,
    image?: string | null,
}

export type EventType = "Fundraising" | "BloodDonation" | "Cleanup" | "Plantation" | "Donation" | "Sports" | "Awareness"
export interface IEvent {
    title: string,
    description: string,
    eventType: EventType,
    image?: string,
    location: string,
    eventDate: string

} 