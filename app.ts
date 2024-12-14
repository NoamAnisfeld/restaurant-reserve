import '@total-typescript/ts-reset';
import express from 'express';
import bodyParser from 'body-parser';
import router from './api/router.ts';

const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use('/api', router);
app.use(express.static('./front/dist'));
app.get('*', (_req, res) => { res.sendFile('front/dist/index.html', { root: process.cwd() }) });

app.listen(PORT, () => {
    console.log(`App is running on Port ${PORT}`);
});
