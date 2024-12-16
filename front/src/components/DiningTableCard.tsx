import { Card, CardTitle, CardContent, CardHeader, CardDescription } from "./ui/card";
import ReserveConfirmation from "./ReserveConfirmation";
import { formatTime } from "@/utils";
import { useMutationReserveDiningTable } from "@/queries";

export interface DiningTableCardProps {
    diningTableIndex: number,
    seats: number,
    hour: number,
    available: boolean,
}

export default function DiningTableCard({
    diningTableIndex,
    seats,
    hour,
    available,
}: DiningTableCardProps) {
    const reserveMutation = useMutationReserveDiningTable(hour, diningTableIndex);
    const name = `Table number ${diningTableIndex + 1}`;

    return (
        <Card className="p-2 m-4 min-w-80">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{`${seats} seats`}</CardDescription>
            </CardHeader>
            <CardContent>
                {
                    available
                        ? <div className="flex gap-2 items-center justify-center">
                            <span>Available</span>
                            <ReserveConfirmation
                                tableName={name}
                                timeString={formatTime(hour)}
                                onConfirm={(closeDialogFn) =>
                                    reserveMutation.mutate(undefined, { onSuccess: closeDialogFn })
                                }
                            />
                        </div>
                        : <span className="font-bold">
                            Reserved
                        </span>
                }
            </CardContent>
        </Card>
    )
}