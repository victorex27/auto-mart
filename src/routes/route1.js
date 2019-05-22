import express from 'express';
import { check } from 'express-validator/check';
import User from '../controllers/user';

import {
  emailCheck, passwordCheck, firstNameCheck, lastNameCheck,
  addressCheck,
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


export default router;
