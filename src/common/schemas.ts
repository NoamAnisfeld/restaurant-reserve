import { z } from 'zod'

export { diningTableSchema, availabilitySchema, timeSlotSchema }
export type { DiningTable, Availability, TimeSlot }

const {
    number,
    object,
    array,
} = z;

const diningTableSchema = object({
    seats: number().positive(),
})

const availabilitySchema = array(z.enum(['available', 'reserved']));

const timeSlotSchema = object({
    hour: number().min(0).max(23),
    availability: availabilitySchema,
});

type DiningTable = z.infer<typeof diningTableSchema>;
type Availability = z.infer<typeof availabilitySchema>;
type TimeSlot = z.infer<typeof timeSlotSchema>;
