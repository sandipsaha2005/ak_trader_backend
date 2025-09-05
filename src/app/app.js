import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { dbConnection } from "../database/dbConnection.js";
import { errorMiddleware } from "../middlewares/error.js";
import mainRoutes from './routes.js';
import fileUpload from 'express-fileupload';
// ----------------------------------------------------------------------

const configureApp = (app) => {
    app.use(cors());
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(helmet());
    app.use(fileUpload());

    dbConnection()
    app.use('/', mainRoutes);
    app.get('/', (req, res) => {
        res.status(200).json({ message: 'Welcome to A K Traders' });
    });
    
};

export default configureApp;

