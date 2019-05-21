import checkAPIs from 'express-validator/check';

const { check } = checkAPIs;

const checkLengthGreaterThanOne = (name => check(name).exists().isLength({ min: 1 })
  .withMessage(`${name} Field cannot be empty`)
  .trim());


export const emailCheck = check('email').exists().isLength({ min: 1 })
  .withMessage('Email Field cannot be empty')
  .isEmail()
  .withMessage('Invalid Email Format')
  .trim();


export const passwordCheck = check('password').exists()
  .isLength({ min: 6, max: 40 })
  .withMessage('Password must be between 6 to 40 characters')
  .not()
  .isNumeric()
  .withMessage('Password Field must contain at least an alphabet')
  .not()
  .isAlpha()
  .withMessage('Password Field must contain at least one number')
  .trim();

export const lastNameCheck = check('lastName').exists()
  .isLength({ min: 1 })
  .withMessage('lastName Field cannot be empty');

export const firstNameCheck = checkLengthGreaterThanOne('firstName');

export const addressCheck = check('address').exists()
  .isLength({ min: 1 })
  .withMessage('Address Field cannot be empty');
