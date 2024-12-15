import { formatTime } from "@/utils";
import { TimeSlot } from "../../../common/schemas"
import { Card } from "@/components/ui/card";

interface TimeslotSelectProps {
    slots: TimeSlot[];
    currentSlot: number;
    onSlotChange: (newSlot: number) => void;
}

export default function TimeslotSelect({
    slots,
    currentSlot,
    onSlotChange,
}: TimeslotSelectProps) {
    return (
        <Card className="w-min m-auto">
            <div className="flex justify-between gap-2 items-center">
                <button disabled={currentSlot === 0} onClick={() => onSlotChange(currentSlot - 1)} aria-label="Previous timeslot">
                    {'<'}
                </button>
                <div>
                    {formatTime(slots[currentSlot].hour)}
                </div>
                <button disabled={currentSlot === slots.length - 1} onClick={() => onSlotChange(currentSlot + 1)} aria-label="Next timeslot">
                    {'>'}
                </button>
            </div>
        </Card>
    );
}