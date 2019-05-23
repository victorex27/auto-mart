import express from 'express';
import User from '../controllers/user';
import Car from '../controllers/car';
import Order from '../controllers/order';

import {
  emailCheck, passwordCheck, firstNameCheck, lastNameCheck,
  addressCheck, checkToken, priceCheck, carIdCheck,
  newPriceSanitizer, orderIdSanitizer, orderIdParamCheck,
  priceParamCheck, carIdParamCheck, carStatusParamCheck, carIdSanitizer,
} from '../helpers/custom-validator';

const router = express.Router();

router.post('/auth/signup', [

  emailCheck,
  passwordCheck,
  firstNameCheck,
  lastNameCheck,
  addressCheck,
], User.create);

router.post('/auth/signin', [
  emailCheck,
  passwordCheck,
], User.signIn);

router.patch('/car/:carId/:carStatus', [
  checkToken, carIdParamCheck, carStatusParamCheck, carIdSanitizer,
], Car.markAsSold);

router.get('/car/:carId', [
  checkToken, carIdParamCheck, carIdSanitizer,
], Car.getSingleCar);

router.post('/order', [
  checkToken,
  priceCheck,
  carIdCheck,
], Order.makeOrder);

router.patch('/order/:orderId/:newPrice', [
  checkToken,
  newPriceSanitizer,
  orderIdParamCheck,
  priceParamCheck,
  orderIdSanitizer,
], Order.updateOrder);


export default router;
