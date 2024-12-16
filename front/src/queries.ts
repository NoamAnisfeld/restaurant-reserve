import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchJSON, postJSON } from "./utils";
import { z } from 'zod';
import { diningTableSchema, timeslotSchema } from "../../common/schemas.ts";

export {
    useQueryDiningTables,
    useQueryAllTimeslots,
    useQueryTimeslot,
    useMutationReserveDiningTable,
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
        queryFn: () => fetchJSON(`/api/timeslot/${hour}`),
        select: data => timeslotSchema.parse(data),
    });
}

function useMutationReserveDiningTable(hour: number, diningTable: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => postJSON('/api/reserve', { hour, diningTable }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['timeslots'] }),
    });
}