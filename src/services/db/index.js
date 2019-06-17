import pg from 'pg';
import dotenv from 'dotenv';
import { userTable } from './migration';
import { userSeed } from './seed';
import '@babel/polyfill';

dotenv.config();

let connectionUrl = process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'production') {
  connectionUrl = process.env.DATABASE_URL_PROD;
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
  query('DROP TABLE users;', [])
    .then((res) => {
      console.log('table dropped');
      // pool.end();
    });
};

createTables(userTable + userSeed);

export {

  query, dropTables,
};
// npm install make-runnable --save
// require('make-runnable');
// use es5
