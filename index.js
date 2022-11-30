import express from 'express';
import * as dotenv from 'dotenv';
import recipieRouter from './routes/recipie.routes.js';
import dbConnect from './config/db.config.js';

dotenv.config();

//por que não chamei a função connect?
dbConnect();

const app = express();

app.use(express.json());

app.use('/recipie', recipieRouter);

app.listen(Number(process.env.PORT), () => console.log('server on port 8080!'));
