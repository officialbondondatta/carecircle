import EditEvent from "../events/EditEvent";
import { IEvent } from "@/lib/types";
import DeleteEvent from "../events/DeleteEvent";

const EventCardButtons = ({ event }: { event: IEvent }) => {

    return (
        <div className="flex gap-2 ml-2">

            <EditEvent event={event}></EditEvent>

            <DeleteEvent event={event}></DeleteEvent>
        </div>
    );
};

export default EventCardButtons;