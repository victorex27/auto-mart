const userTable = `CREATE TABLE IF NOT EXISTS  users 
(id serial PRIMARY KEY,
    email VARCHAR(40) UNIQUE, 
    password VARCHAR(128), 
    first_name VARCHAR(40), 
    last_name VARCHAR(40),
    address TEXT,
    is_admin BOOLEAN ); `;

const carTable = `CREATE TABLE IF NOT EXISTS cars 
    (id serial PRIMARY KEY, 
        owner BIGINT NOT NULL,
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        state TEXT CHECK ( state IN ('new','used') ),
        status TEXT CHECK ( status IN ('sold','available') ),
        price FLOAT,
        manufacturer VARCHAR(40) NOT NULL,
        model VARCHAR(40) NOT NULL,
        body_type VARCHAR(40) NOT NULL,
        url TEXT NOT NULL,
        CONSTRAINT ct_owner FOREIGN KEY (owner) REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE);`;

export {

  userTable, carTable,
};
