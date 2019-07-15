import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import router1 from './routes/route1';


dotenv.config();

const app = express();
const portNumber = process.env.PORT || 3000;
process.on('unhandledRejection', () => {
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api/v1', router1);

const options = {
  validatorUrl: null,
};


app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument, false, options));

function redirectUnmatched(req, res) {
  return res.status(400).json({ status: 400, error: 'Malformed Path' });
}
app.use(redirectUnmatched);

const server = app.listen(portNumber);

console.log('app running on port ', portNumber);

export default server;
