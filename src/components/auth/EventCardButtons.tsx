import EditEvent from "../events/EditEvent";
import { IEvent } from "@/lib/types";
import DeleteEvent from "../events/DeleteEvent";

const EventCardButtons = ({ event }: { event: IEvent }) => {

    return (
        <div className="flex min-w-0 max-w-full flex-wrap gap-2">

            <EditEvent event={event}></EditEvent>

            <DeleteEvent event={event}></DeleteEvent>
        </div>
    );
};

export default EventCardButtons;
