import express from 'express';
import configureApp from './app/app.js';
import dotenv from 'dotenv';
// ----------------------------------------------------------------------

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const app = express();

configureApp(app);

app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`);
});
