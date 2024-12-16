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
                        ? <>
                            Available
                            <ReserveConfirmation
                                tableName={name}
                                timeString={formatTime(hour)}
                                onConfirm={(closeDialogFn) => 
                                    reserveMutation.mutate(undefined, { onSuccess: closeDialogFn })
                                }
                            />
                        </>
                        : 'Reserved'
                }
            </CardContent>
        </Card>
    )
}