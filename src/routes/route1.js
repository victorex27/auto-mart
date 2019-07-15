import express from 'express';
// import cors from 'cors';
import User from '../controllers/v1/user';
import Car from '../controllers/v1/car';
import Order from '../controllers/v1/order';
import Flag from '../controllers/v1/flag';

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


const router1 = express.Router();

router1.post('/auth/signup', [

  emailCheck,
  passwordCheck,
  firstNameCheck,
  lastNameCheck,
  addressCheck,
], User.create);

router1.post('/auth/signin', [
  emailCheck,
  passwordCheck,
], User.signIn);

router1.post('/car', checkToken, Car.postCarAd);

router1.post('/order', [
  checkToken,
  priceCheck,
  carIdCheck,
], Order.makeOrder);

router1.post('/flag', [checkToken, reasonCheckCheck,
  descriptionCheck, carIdCheck], Flag.postFlag);

router1.get('/car', [
  checkToken, statusQueryCheck, manufacturerQueryCheck,
  bodyTypeQueryCheck, usedStatusQueryCheck,
  minQueryCheck, maxQueryCheck, arefieldsTheSameQueryCheck,
], Car.getAllUnsoldAvailableCars);

router1.get('/car/:carId', [
  checkToken, carIdParamCheck, carIdSanitizer,
], Car.getSingleCar);

router1.get('/order/seller', [
  checkToken,
], Order.getOrder);

router1.get('/order/buyer', [
  checkToken,
], Order.getOrder);

router1.delete('/car/:carId', [
  checkToken, carIdParamCheck, carIdSanitizer,
], Car.getDeleteCar);

router1.patch('/car/:carId/:car', [
  checkToken, carIdParamCheck, carStatusParamCheck,
  priceOptionalCheck, carIdSanitizer,
], Car.update);

router1.patch('/order/:orderId/:newPrice', [
  checkToken,
  newPriceSanitizer,
  orderIdParamCheck,
  priceParamCheck,
  orderIdSanitizer,
], Order.updateOrder);

export default router1;
