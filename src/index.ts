import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user';


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

app.use('/api', userRoutes);

//connect to mongodb
mongoose.connect(process.env.MONGO_DB_URI || '').then(() => {
    console.log("conected to mongodb")
}).catch((err) => {
    console.log("error", err)
}
);

//port
server.listen(port, () => console.log(`Server is running on http://localhost:${port}`));


