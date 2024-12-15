import { useQuery } from "@tanstack/react-query";
import { fetchJSON } from "./utils";
import { z } from 'zod';
import { diningTableSchema, timeslotSchema } from "../../common/schemas.ts";

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
        select: data => z.array(timeslotSchema).parse(data),
    });
}

function useQueryTimeslot(hour: number) {
    return useQuery({
        queryKey: ['timeslots', hour],
        queryFn: () => fetchJSON(`/api/timeslots/${hour}`),
        select: data => z.array(z.boolean()).parse(data),
    });
}

