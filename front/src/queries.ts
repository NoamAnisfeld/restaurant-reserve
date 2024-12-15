import { useQuery } from "@tanstack/react-query";
import { fetchJSON } from "./utils";
import { z } from 'zod';
import { diningTableSchema, timeSlotSchema, availabilitySchema } from "../../common/schemas.ts";

export {
    useQueryDiningTables,
    useQueryAllTimeslots,
    useQueryTimeslot,
}

function useQueryDiningTables() {
    return useQuery({
        queryKey: ['diningTables'],
        queryFn: () => fetchJSON('/api/dining-tables'),
        select: data => z.array(diningTableSchema).parse(data),
    });
}

function useQueryAllTimeslots() {
    return useQuery({
        queryKey: ['timeslots'],
        queryFn: () => fetchJSON('/api/timeslots'),
        select: data => z.array(timeSlotSchema).parse(data),
    });
}

function useQueryTimeslot(hour: number) {
    return useQuery({
        queryKey: ['timeslots', hour],
        queryFn: () => fetchJSON(`/api/timeslots/${hour}`),
        select: data => availabilitySchema.parse(data),
    });
}

