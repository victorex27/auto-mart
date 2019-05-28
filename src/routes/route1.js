import express from 'express';
import multipart from 'connect-multiparty';
import multer from 'multer';
import fileType from 'file-type';
import User from '../controllers/user';
import Car from '../controllers/car';
import Order from '../controllers/order';
import Flag from '../controllers/flag';
import {
  emailCheck, passwordCheck, firstNameCheck, lastNameCheck,
  addressCheck, checkToken, priceCheck, carIdCheck,
  newPriceSanitizer, orderIdSanitizer, orderIdParamCheck,
  priceParamCheck, carIdParamCheck, carStatusParamCheck, carIdSanitizer,
  statusQueryCheck, minQueryCheck, maxQueryCheck, arefieldsTheSameQueryCheck,
  priceOptionalCheck, usedStatusQueryCheck, bodyTypeQueryCheck, 
  manufacturerQueryCheck, reasonCheckCheck, descriptionCheck,
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

router.patch('/car/:carId/:car', [
  checkToken, carIdParamCheck, carStatusParamCheck,
  priceOptionalCheck, carIdSanitizer,
], Car.markAsSold);


router.post('/car', checkToken, Car.postCarAd);
router.get('/car', [
  checkToken, manufacturerQueryCheck, statusQueryCheck,
  minQueryCheck, maxQueryCheck, arefieldsTheSameQueryCheck,
  usedStatusQueryCheck, bodyTypeQueryCheck,
], Car.getAllUnsoldAvailableCars);

router.get('/car/:carId', [
  checkToken, carIdParamCheck, carIdSanitizer,
], Car.getSingleCar);

router.delete('/car/:carId', [
  checkToken, carIdParamCheck, carIdSanitizer,
], Car.getDeleteCar);

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

router.post('/flag', [checkToken, reasonCheckCheck, 
  descriptionCheck, carIdCheck], Flag.postFlag);

export default router;
