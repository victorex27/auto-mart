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

module.exports = {

  userSeed,
};
