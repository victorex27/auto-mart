import express from 'express';
import User from '../controllers/v2/user';

import {
  emailCheck, passwordCheck, firstNameCheck, lastNameCheck,
  addressCheck,
} from '../helpers/custom-validator';


const router2 = express.Router();

router2.post('/auth/signup', [

  emailCheck,
  passwordCheck,
  firstNameCheck,
  lastNameCheck,
  addressCheck,
], User.create);

export default router2;
