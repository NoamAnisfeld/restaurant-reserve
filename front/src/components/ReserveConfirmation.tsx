import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";

interface ReserveConfirmationProps {
    tableName: string;
    timeString: string;
    onConfirm: (closeDialogFn: () => void) => void;
}

export default function ReserveConfirmation({
    tableName,
    timeString,
    onConfirm,
}: ReserveConfirmationProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>Reserve</DialogTrigger>
            <DialogContent className="w-fit pe-14">
                <DialogHeader className="text-balance">
                    <DialogTitle>Are you sure you want to reserve {tableName} for {timeString}?</DialogTitle>
                </DialogHeader>
                <div className="flex gap-2 content-center">
                    <DialogClose asChild>
                        <Button variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        className="bg-primary text-primary-foreground"
                        onClick={() => onConfirm(() => setIsOpen(false))}
                    >
                        Reserve
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}