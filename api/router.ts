import express, { type ErrorRequestHandler } from "express";
import { getDiningTables, getAllTimeslots, getTimeslot, reserveDiningTable } from "./data.ts";

const router = express.Router();
export default router;

router.get('/dining-tables', async (_req, res, next) => {
    try {
        res.send(await getDiningTables());
    } catch (error) {
        next(error);
    }
});

router.get('/timeslots', async (_req, res, next) => {
    try {
        res.send(await getAllTimeslots());
    } catch (error) {
        next(error);
    }
});

router.get('/timeslot/:hour', async (req, res, next) => {
    try {
        res.send(await getTimeslot(Number(req.params.hour)));
    } catch (error) {
        next(error);
    }
});

router.post('/reserve', async (req, res, next) => {
    try {
        await reserveDiningTable(req.body.hour, req.body.diningTable);
        res.sendStatus(201);
    } catch (error) {
        next(error);
    }
});

router.use(((_error, _req, res, _next) => { res.status(500).send('an error occured') }) as ErrorRequestHandler);
