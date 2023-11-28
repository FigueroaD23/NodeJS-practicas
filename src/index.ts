import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user';
import { mongoConnection } from '../src/db/connection/index';

const app = express();
dotenv.config();

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(compression()); //Compress all routes
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); //allow cross origin requests

const server = http.createServer(app);
const port = process.env.PORT || 3002;

//connect to mongodb
app.use(async (req, res, next) => {
    console.log('connecting to mongodb');
    await mongoConnection();
    next();
});

//routes
app.use('/api', userRoutes);
app.get('/', (req, res) => {
    res.json({ env: `process.env.MONGO_DB_URI: ${process.env.MONGO_DB_URI}` });
});

server.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
