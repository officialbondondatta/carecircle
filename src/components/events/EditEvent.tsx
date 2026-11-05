"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import type { IEvent } from "@/lib/types"
import { eventTypes, getToday } from "@/lib/utils"
import { Edit, LoaderCircle } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react"
import { toast } from "sonner";



const EditEvent = ({ event }: { event: IEvent }) => {
    const { title, description, eventDate, eventType, location, image } = event
    const [pending, setPending] = useState(false)
    const [open, setOpen] = useState(false)
    const [error, setError] = useState("")
    const [minDate, setMinDate] = useState("")
    const router = useRouter()

    const handleEditEvent = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (pending) return
        setError("")
        const formData = new FormData(e.currentTarget)
        const date = String(formData.get("eventDate"))
        if (!date || date < getToday()) {
            setError("Please select today or a future date.")
            return
        }
        const updatedData = Object.fromEntries(formData.entries())
        setPending(true)
        try {
            const token = await getTokenFromClient()
            const res = await fetch(`${process.env.NEXT_PUBLIC_CIRCLESERVER}/edit-event/${event._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': "application/json",
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            })
            const result = await res.json()
            if (!res.ok) {
                throw new Error(result.message || "Unable to update the event. Please try again.")
            }
            if (result.modifiedCount > 0) {
                setOpen(false)
                router.refresh()
                toast.success("Event Updated Successfully")
            }
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong!"
            );
        } finally {
            setPending(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={(open) => {
            if (pending) return
            setOpen(open)
            setError("")
            if (open) setMinDate(getToday())
        }}>
            <DialogTrigger render={<Button className="cursor-pointer rounded-xs bg-carecircle-button px-7 py-5 text-lg font-semibold text-carecircle-text hover:bg-carecircle-button" />}>
                <Edit aria-hidden="true" /> Edit
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] overflow-y-auto bg-carecircle-bg sm:max-w-lg">
                <form aria-busy={pending} onSubmit={handleEditEvent} className="space-y-5">
                    <DialogHeader>
                        <DialogTitle className="text-carecircle-primary">Edit event</DialogTitle>
                        <DialogDescription>Update your event details below.</DialogDescription>
                    </DialogHeader>
                    <FieldGroup className="gap-4">
                        <Field>
                            <Label htmlFor="title">Event Title</Label>
                            <Input id="title" name="title" defaultValue={title} disabled={pending} required className="bg-white" />
                        </Field>
                        <Field>
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" name="description" defaultValue={description} disabled={pending} required className="bg-white" />
                        </Field>
                        <Field>
                            <Label htmlFor="eventType">Event Type</Label>
                            <Select name="eventType" items={eventTypes} defaultValue={eventType} disabled={pending} required>
                                <SelectTrigger id="eventType" className="w-full bg-white"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {eventTypes.map((type) => <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <Label htmlFor="image">Event Thumbnail URL</Label>
                            <Input id="image" name="image" type="url" defaultValue={image} disabled={pending} required className="bg-white" />
                        </Field>
                        <Field>
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" name="location" defaultValue={location} disabled={pending} required className="bg-white" />
                        </Field>
                        <Field>
                            <Label htmlFor="eventDate">Event Date</Label>
                            <Input id="eventDate" name="eventDate" type="date" min={minDate} defaultValue={eventDate.slice(0, 10)} onFocus={(e) => {
                                const today = getToday()
                                e.currentTarget.min = today
                                setMinDate(today)
                            }} disabled={pending} required className="bg-white" />
                        </Field>
                    </FieldGroup>
                    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
                    <DialogFooter>
                        <DialogClose render={<Button disabled={pending} type="button" variant="outline" />}>Cancel</DialogClose>
                        <Button type="submit" disabled={pending} aria-busy={pending} className="bg-carecircle-primary text-white hover:bg-carecircle-primary/90">
                            {pending && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
                            {pending ? "Saving changes…" : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditEvent
