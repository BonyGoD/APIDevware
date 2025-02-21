import express, { json } from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { createMailRouter } from './routes/mailRoute.js';
import { createFotosRouter } from './routes/fotosRoute.js';
import dotenv from 'dotenv';

export const createApi = ({ mailModel, fotoModel }) => {

    const app = express();
    app.use(json());
    app.use(corsMiddleware());
    app.disable('x-powered-by');

    dotenv.config();

    app.use('/', createMailRouter({ mailModel }));
    app.use('/fotos', createFotosRouter({ fotoModel }));

    const PORT = process.env.PORT ?? 3000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}