import checkAPIs from 'express-validator/check';

const { check } = checkAPIs;


export const emailCheck = check('email').exists()
  .withMessage('Email Field is missing')
  .isLength({ min: 1 })
  .withMessage('Email Field cannot be empty')
  .isEmail()
  .withMessage('Invalid Email Format')
  .trim();


export const passwordCheck = check('password').exists()
  .withMessage('Password Field is missing')
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
  .withMessage('Last Name Field is missing')
  .isLength({ min: 1 })
  .withMessage('Last Name Field cannot be empty');

export const firstNameCheck = check('firstName').exists()
  .withMessage('First Name Field is missing')
  .isLength({ min: 1 })
  .withMessage('First Name Field cannot be empty');

export const addressCheck = check('address').exists()
  .withMessage('Address Field is missing')
  .isLength({ min: 1 })
  .withMessage('Address Field cannot be empty');
