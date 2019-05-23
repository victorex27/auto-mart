import express from 'express';
import dotenv from 'dotenv';
import router1 from './routes/route1';


dotenv.config();
const app = express();

const portNumber = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', router1);


function redirectUnmatched(req, res) {
  return res.status(400).json({ status: 400, error: 'Malformed Path' });
}
app.use(redirectUnmatched);

const server = app.listen(portNumber);

console.log('app running on port ', portNumber);

export default server;
