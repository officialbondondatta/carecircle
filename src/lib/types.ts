export interface IUserProps {
    name: string,
    email: string,
    image?: string | null,
    createdAt?: Date,
}

export type EventType = "Fundraising" | "BloodDonation" | "Cleanup" | "Plantation" | "Donation" | "Sports" | "Awareness"
export interface IEvent {
    _id: string,
    title: string,
    description: string,
    eventType: EventType,
    image: string,
    location: string,
    eventDate: string,
    createdAt: Date,
    userEmail: string

} 