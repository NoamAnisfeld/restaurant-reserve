import { z } from 'zod';

export { diningTableSchema, timeslotSchema }
export type { DiningTable, Timeslot }

const {
    number,
    boolean,
    object,
    array,
} = z;

const diningTableSchema = object({
    seats: number().positive(),
})

const timeslotSchema = object({
    hour: number().min(0).max(23),
    availability: array(boolean()),
});

type DiningTable = z.infer<typeof diningTableSchema>;
type Timeslot = z.infer<typeof timeslotSchema>;
