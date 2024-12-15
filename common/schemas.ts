import { z } from 'zod'

export { diningTableSchema, availabilitySchema, timeslotSchema }
export type { DiningTable, Availability, Timeslot }

const {
    number,
    object,
    array,
} = z;

const diningTableSchema = object({
    seats: number().positive(),
})

const availabilitySchema = array(z.enum(['available', 'reserved']));

const timeslotSchema = object({
    hour: number().min(0).max(23),
    availability: availabilitySchema,
});

type DiningTable = z.infer<typeof diningTableSchema>;
type Availability = z.infer<typeof availabilitySchema>;
type Timeslot = z.infer<typeof timeslotSchema>;
