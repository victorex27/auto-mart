const bcryptjs = require('bcryptjs');

const salt = bcryptjs.genSaltSync(10);
const hash = bcryptjs.hashSync('password70', salt);
const userSeed = `
     INSERT INTO users (email,password,first_name,last_name, address, is_admin) VALUES 
     ('aobikobe@gmail.com','${hash}','amaobi','obikobe','33 kwaru family way ikotun lagos',true),
     ('mikenit90@gmail.com','${hash}','arinze','obikobe','40 Owerri west, owerri',false),
     ('victorex27@hotmail.com','${hash}','ekene','obikobe','50 abuloma, port harcourt, rivers',false),
     ('victorvents@hotmail.com','${hash}','emenike','obikobe','16 udo udoma, by abak road, akwa ibom',false);
     
    `;

const url = 'http://res.cloudinary.com/blueandblack/image/upload/v1558957073/lz1rztg8vkvpfyffgsrv.jpg';

const carSeed = `
        INSERT INTO cars (owner,state,status, price, manufacturer, model, body_type, url) VALUES 
        ( 1,'new', 'available', 1.4, 'mercedes', '2014', 'trailer','${url}'),
        ( 2,'used', 'available', 1.8, 'honda', '2015', 'coupe','${url}'),
        ( 3,'used', 'available', 2.8, 'mercedes', '2014', 'trailer','${url}'),
        ( 1,'new', 'sold', 1.4, 'mercedes', '2016', 'coupe','${url}'),
        ( 3,'used', 'sold', 3.2, 'mercedes', '2014', 'saloon','${url}'),
        ( 3,'used', 'available', 4.7, 'toyota', '2018', 'saloon','${url}'),
        ( 3,'used', 'available', 5.4, 'mercedes', '2014', 'trailer','${url}'),
        ( 1,'used', 'sold', 1.4, 'volkswagen', '1998', 'saloon','${url}'),
        ( 1,'used', 'available', 6.4, 'hyundai', '2014', 'mpv','${url}'),
        ( 1,'used', 'sold', 9.4, 'buggati', '2011', 'trailer','${url}'),
        ( 1,'used', 'available', 11.4, 'mercedes', '2013', 'trailer','${url}'),
        ( 1,'used', 'available', 12.4, 'dodge', '2015', 'suv','${url}'),
        ( 1,'used', 'sold', 1.5, 'ferari', '2014', 'trailer','${url}'),
        ( 1,'used', 'available', 1.6, 'maclaren', '2014', 'coupe','${url}')
        ;
       `;

const orderSeed = `
       INSERT INTO orders (buyer,car_id,amount,status) VALUES 
       ( 1,3,1400000, 'pending'),
       ( 2,3,1400000, 'pending'),
       ( 3,2,1400000, 'pending'),
       ( 2,1,1400000, 'pending'),
       ( 3,1,1400000, 'pending'),
       ( 3,4,1400000, 'accepted'),
       ( 3,8,1400000, 'accepted'),
       ( 1,5,1400000, 'accepted'),
       ( 1,6,1400000, 'pending'),
       ( 2,10,1400000, 'accepted'),
       ( 3,13,1400000, 'accepted')
       ;
      `;

export {
  userSeed, carSeed, orderSeed,
};
