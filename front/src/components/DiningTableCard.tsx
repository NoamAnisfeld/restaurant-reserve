import { Card, CardTitle, CardContent, CardHeader, CardDescription } from "./ui/card";

export interface DiningTableCardProps {
    name: string,
    seats: number,
    available: boolean,
}

export default function DiningTableCard({
    name,
    seats,
    available,
}: DiningTableCardProps) {
    return (
        <Card className="p-2 m-4 min-w-80">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{`${seats} seats`}</CardDescription>
            </CardHeader>
            <CardContent>{available ? 'Available' : 'Reserved'}</CardContent>
        </Card>
    )
}