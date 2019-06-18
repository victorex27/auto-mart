import pg from 'pg';
import dotenv from 'dotenv';
import { userTable, carTable, orderTable } from './migration';
import { userSeed, carSeed, orderSeed } from './seed';
import '@babel/polyfill';

dotenv.config();

let connectionUrl = process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'production') {
  connectionUrl = process.env.DATABASE_URL_PROD;
} else if (process.env.NODE_ENV === 'development') {
  connectionUrl = process.env.DATABASE_URL_DEV;
}


const pool = new pg.Pool({
  connectionString: connectionUrl,
});

const query = ((text, params) => new Promise((resolve, reject) => {
  pool.query(text, params)
    .then((res) => {
      resolve(res);
    });
}));


const createTables = (table) => {
  query(table, [])
    .then((res) => {
      // pool.end();
    });
};

const dropTables = () => {
  query('DROP TABLE users, cars, orders;', [])
    .then((res) => {
      console.log('table dropped');
    });
};

if (process.env.NODE_ENV === 'test') {
  createTables(userTable + carTable + orderTable + userSeed + carSeed + orderSeed);
} else {
  createTables(userTable + carTable + orderTable);
}


export {
  query, dropTables,
};
// npm install make-runnable --save
// require('make-runnable');
// use es5
