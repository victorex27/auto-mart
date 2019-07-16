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
        deleted Boolean DEFAULT false,
        price FLOAT,
        manufacturer VARCHAR(40) NOT NULL,
        model VARCHAR(40) NOT NULL,
        body_type VARCHAR(40) NOT NULL,
        url TEXT NOT NULL,
        CONSTRAINT ct_owner FOREIGN KEY (owner) REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE);`;

const orderTable = `
CREATE TABLE IF NOT EXISTS orders
( id serial PRIMARY KEY, 
    buyer BIGINT NOT NULL,
    car_id BIGINT, 
    amount BIGINT, 
    status TEXT CHECK ( status IN ('pending','accepted','rejected') ) DEFAULT 'pending', 
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    UNIQUE (buyer, car_id),
    CONSTRAINT or_buyer  FOREIGN KEY (buyer) REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT or_car_id FOREIGN KEY (car_id) REFERENCES cars(id) ON UPDATE CASCADE ON DELETE RESTRICT );`;


const flagTable = `
CREATE TABLE IF NOT EXISTS flags
( id serial PRIMARY KEY,
    car_id BIGINT, 
    user_id BIGINT, 
    reason TEXT CHECK ( reason IN ('pricing','weird demands','others') ), 
    description TEXT NOT NULL, 
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fl_user_id  FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fl_car_id FOREIGN KEY (car_id) REFERENCES cars(id) ON UPDATE CASCADE ON DELETE RESTRICT );`;

export {

  userTable, carTable, orderTable, flagTable,
};
