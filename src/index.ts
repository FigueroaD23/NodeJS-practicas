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
app.use(cookieParser());
app.use(compression());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const server = http.createServer(app);


const port = process.env.PORT || 3002;

//routes
app.get('/', (req, res) => {
    res.json({
        env: `process.env.MONGO_DB_URI: ${process.env.MONGO_DB_URI}`
    });
});

//connect to mongodb
app.use(async function (req, res, next) {
    console.time('DB_Connection')
    await mongoConnection()
    console.timeEnd('DB_Connection')
    next()
})
app.use('/api', userRoutes);


//port
server.listen(port, () => console.log(`Server is running on http://localhost:${port}`));


