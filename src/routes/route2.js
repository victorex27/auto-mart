import express from 'express';
import User from '../controllers/v2/user';
import Car from '../controllers/v2/car';
import Order from '../controllers/v2/order';
import Flag from '../controllers/v2/flag';

import {
  emailCheck, passwordCheck, firstNameCheck, lastNameCheck,
  addressCheck, checkToken, priceCheck, carIdCheck, statusQueryCheck,
  carIdParamCheck, carIdSanitizer, manufacturerQueryCheck,
  bodyTypeQueryCheck, usedStatusQueryCheck,
  minQueryCheck, maxQueryCheck, arefieldsTheSameQueryCheck,
  priceOptionalCheck, carStatusParamCheck,
  newPriceSanitizer, orderIdParamCheck, priceParamCheck, orderIdSanitizer,
  reasonCheckCheck, descriptionCheck,
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

router2.post('/flag', [checkToken, reasonCheckCheck,
  descriptionCheck, carIdCheck], Flag.postFlag);

router2.get('/car', [
  checkToken, statusQueryCheck, manufacturerQueryCheck,
  bodyTypeQueryCheck, usedStatusQueryCheck,
  minQueryCheck, maxQueryCheck, arefieldsTheSameQueryCheck,
], Car.getAllUnsoldAvailableCars);

router2.get('/car/:carId', [
  checkToken, carIdParamCheck, carIdSanitizer,
], Car.getSingleCar);

router2.get('/order/seller', [
  checkToken,
], Order.getOrder);

router2.get('/order/buyer', [
  checkToken,
], Order.getOrder);

router2.delete('/car/:carId', [
  checkToken, carIdParamCheck, carIdSanitizer,
], Car.getDeleteCar);

router2.patch('/car/:carId/:car', [
  checkToken, carIdParamCheck, carStatusParamCheck,
  priceOptionalCheck, carIdSanitizer,
], Car.update);

router2.patch('/order/:orderId/:newPrice', [
  checkToken,
  newPriceSanitizer,
  orderIdParamCheck,
  priceParamCheck,
  orderIdSanitizer,
], Order.updateOrder);

export default router2;
