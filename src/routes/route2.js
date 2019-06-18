import express from 'express';
import User from '../controllers/v2/user';
import Car from '../controllers/v2/car';
import Order from '../controllers/v2/order';

import {
  emailCheck, passwordCheck, firstNameCheck, lastNameCheck,
  addressCheck, checkToken, priceCheck, carIdCheck, statusQueryCheck,
  carIdParamCheck, carIdSanitizer, manufacturerQueryCheck,
} from '../helpers/custom-validator';


const router2 = express.Router();

router2.post('/auth/signup', [

  emailCheck,
  passwordCheck,
  firstNameCheck,
  lastNameCheck,
  addressCheck,
], User.create);

router2.post('/auth/signin', [
  emailCheck,
  passwordCheck,
], User.signIn);

router2.post('/car', checkToken, Car.postCarAd);

router2.post('/order', [
  checkToken,
  priceCheck,
  carIdCheck,
], Order.makeOrder);

router2.get('/car', [
  checkToken, statusQueryCheck, manufacturerQueryCheck,
], Car.getAllUnsoldAvailableCars);

router2.get('/car/:carId', [
  checkToken, carIdParamCheck, carIdSanitizer,
], Car.getSingleCar);

export default router2;
