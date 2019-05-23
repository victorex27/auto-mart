import jwt from 'jsonwebtoken';
import { check, param } from 'express-validator/check';
import { sanitizeParam } from 'express-validator/filter';

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

export const carIdCheck = check('carId').exists()
  .withMessage('No car id supplied')
  .isInt({ min: 1 })
  .withMessage('Car id must be a positive integer')
  .trim();


export const priceCheck = check('amount').exists()
  .withMessage('Price is not supplied')
  .isInt({ min: 1 })
  .withMessage('Price must be a positive integer')
  .trim();

export const orderIdParamCheck = param('orderId').exists()
  .isInt({ min: 1 }).withMessage('Order id must be a positive integer')
  .not()
  .contains('.')
  .withMessage('Order id must be a positive integer')
  .trim();
export const priceParamCheck = param('newPrice').exists()
  .isFloat({ min: 1 })
  .withMessage('New Price must be a positive number')
  .trim();

const sanitize = name => sanitizeParam(name).toInt();

export const orderIdSanitizer = sanitize('orderId');
export const newPriceSanitizer = sanitizeParam('newPrice').toFloat();

export const checkToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];
    req.token = token;
    try {
      const result = jwt.verify(token, process.env.YOUR_SECRET_KEY);
      req.user = result;
    } catch (e) {
      return res.status(403).json({ status: 403, error: 'Forbidden' });
    }

    next();
  } else {
    // If header is undefined
    return res.status(403).json({ status: 403, error: 'Forbidden' });
  }
};
