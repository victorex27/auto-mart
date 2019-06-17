const userTable = `CREATE TABLE IF NOT EXISTS  users 
(id serial PRIMARY KEY,
    email VARCHAR(40) UNIQUE, 
    password VARCHAR(128), 
    first_name VARCHAR(40), 
    last_name VARCHAR(40),
    address TEXT,
    is_admin BOOLEAN ); `;

export {

  userTable,
};
