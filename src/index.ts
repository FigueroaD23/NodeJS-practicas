import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';


const app = express();

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
    res.send('Hello World!');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});

//port
server.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
