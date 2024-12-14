import fs from 'node:fs/promises';
import { z } from 'zod';
import { diningTableSchema, timeSlotSchema } from '../common/schemas.ts';
import type { DiningTable, TimeSlot } from '../common/schemas.ts';

export {
    getDiningTables,
    getAllTimeSlots,
    getAvailableDiningTables,
    reserveDiningTable,
}

let diningTables: DiningTable[] = [];
let timeSlots: TimeSlot[] = [];
let initialized = false;

async function getDiningTables() {
    if (!initialized) {
        await initData();
    }
    return diningTables;
}

async function getAllTimeSlots() {
    if (!initialized) {
        await initData();
    }
    return timeSlots;
}

async function getAvailableDiningTables(hour: number) {
    if (!initialized) {
        await initData();
    }

    const slot = timeSlots.find(slot => slot.hour === hour);
    if (!slot) {
        throw new Error('invalid hour');
    }
    return slot.availability;
}

async function reserveDiningTable(hour: number, diningTable: number) {
    if (!initialized) {
        await initData();
    }

    const availability = await getAvailableDiningTables(hour);
    if (availability[diningTable] !== 'available') {
        throw new Error('dining table is not available');
    }
    timeSlots[hour].availability[diningTable] = 'reserved';
    await persistData({ diningTables, timeSlots });
}

async function initData() {
    try {
        const data = await fs.readFile('pseudo-db.json', 'utf-8');
        const json = JSON.parse(data);
        const parsed = z.object({
            diningTables: z.array(diningTableSchema),
            timeSlots: z.array(timeSlotSchema),
        }).parse(json);

        parsed.timeSlots.forEach(slot => {
            if (slot.availability.length !== parsed.diningTables.length) {
                throw new Error('corroupted data: availability array length doesn\'t match number of dining table');
            }
        });
        
        ({ diningTables, timeSlots } = parsed);
        initialized = true;
    } catch (error) {
        throw new Error('failed to read data');
    }
}

async function persistData(data: { diningTables: DiningTable[], timeSlots: TimeSlot[] }) {
    try {
        const jsonText = JSON.stringify(data, null, 2);
        await fs.writeFile('pseudo-db.json', jsonText);
    } catch (error) {
        console.error(error);
    }
}