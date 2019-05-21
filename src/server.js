import express from 'express';
import dotenv from 'dotenv';
import router1 from './routes/route1';


const app = express();
dotenv.config();
const portNumber = process.env.PORT || 3000;

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', router1);

const server = app.listen(portNumber);

console.log('app running on port ', portNumber);

export default server;
