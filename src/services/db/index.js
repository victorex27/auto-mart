import pg from 'pg';
import dotenv from 'dotenv';
import {
  userTable, carTable, orderTable, flagTable,
} from './migration';
import {
  userSeed, carSeed, orderSeed, flagSeed,
} from './seed';
import '@babel/polyfill';

dotenv.config();

let connectionUrl = process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'production') {
  connectionUrl = process.env.DATABASE_URL_PROD;
} 
else if (process.env.NODE_ENV === 'development') {
  connectionUrl = process.env.DATABASE_URL_DEV;
}


const pool = new pg.Pool({
  connectionString: connectionUrl,
});

const query = ((text, params) => new Promise((resolve, reject) => {
  pool.query(text, params)
    .then((res) => {
      resolve(res);
    }).catch((res) => {
      reject(res);
    });
}));


const createTables = (table) => {
  query(table, [])
    .then((res) => {
      // pool.end();
    });
};

const dropTables = () => {
  query('DROP TABLE users, cars, orders, flags;', [])
    .then((res) => {
    });
};

if (process.env.NODE_ENV === 'test') {
  createTables(userTable + carTable
    + flagTable + orderTable + userSeed + carSeed + orderSeed + flagSeed);
} else {
  createTables(userTable + carTable + flagTable + orderTable);
}


export {
  query, dropTables,
};
// npm install make-runnable --save
// require('make-runnable');
// use es5
