import express from 'express';
import User from '../controllers/user';
import Order from '../controllers/order';

import {
  emailCheck, passwordCheck, firstNameCheck, lastNameCheck,
  addressCheck, checkToken, priceCheck, carIdCheck,
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

router.post('/order', [
  checkToken,
  priceCheck,
  carIdCheck,
], Order.makeOrder);


export default router;
