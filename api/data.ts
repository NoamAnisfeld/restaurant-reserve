import fs from 'node:fs/promises';
import { z } from 'zod';
import { diningTableSchema, timeslotSchema } from '../common/schemas.ts';
import type { DiningTable, Timeslot } from '../common/schemas.ts';

export {
    getDiningTables,
    getAllTimeslots,
    getTimeslot,
    reserveDiningTable,
}

let diningTables: DiningTable[] = [];
let timeslots: Timeslot[] = [];
let initialized = false;
let isInitializing = false;

async function getDiningTables() {
    await ensureInitialization();
    return diningTables;
}

async function getAllTimeslots() {
    await ensureInitialization();
    return timeslots;
}

async function getTimeslot(hour: number) {
    await ensureInitialization();

    const slot = timeslots.find(slot => slot.hour === hour);
    if (!slot) {
        throw new Error('invalid hour');
    }
    return slot;
}

async function reserveDiningTable(hour: number, diningTable: number) {
    await ensureInitialization();

    const slot = await getTimeslot(hour);
    if (!slot.availability[diningTable]) {
        throw new Error('dining table is not available');
    }

    slot.availability[diningTable] = false;
    await persistData({ diningTables, timeslots });
}

async function ensureInitialization() {
    if (initialized) {
        return;
    }

    for (let i = 0; i < 50 && isInitializing; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    if (!initialized) {
        isInitializing = true;
        await initData();
        isInitializing = false;
    }
}

async function initData() {
    try {
        if (!await (fs.access('pseudo-db.json').then(() => true).catch(() => false))) {
            await initPesudoDB();
        }
        const data = await fs.readFile('pseudo-db.json', 'utf-8');
        const json = JSON.parse(data);
        const parsed = z.object({
            diningTables: z.array(diningTableSchema),
            timeslots: z.array(timeslotSchema),
        }).parse(json);

        parsed.timeslots.forEach(slot => {
            if (slot.availability.length !== parsed.diningTables.length) {
                throw new Error('corroupted data: availability array length doesn\'t match number of dining table');
            }
        });

        ({ diningTables, timeslots } = parsed);
        initialized = true;
    } catch (error) {
        console.log(error);
        throw new Error('failed to read data');
    }
}

async function persistData(data: { diningTables: DiningTable[], timeslots: Timeslot[] }) {
    try {
        const jsonText = JSON.stringify(data, null, 2);
        await fs.writeFile('pseudo-db.json', jsonText);
    } catch (error) {
        console.error(error);
    }
}

async function initPesudoDB() {
    await fs.copyFile('pseudo-db-initial-state.json', 'pseudo-db.json');
}