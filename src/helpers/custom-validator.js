import jwt from 'jsonwebtoken';
import { check, param, query } from 'express-validator/check';
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

export const lastNameCheck = check('last_name')
  . exists()
  . withMessage('Last Name Field is missing')
  . isLength({ min: 1 })
  . withMessage('Last Name Field cannot be empty');
export const firstNameCheck = check('first_name')
  . exists()
  . withMessage('First Name Field is missing')
  . isLength({ min: 1 })
  . withMessage('First Name Field cannot be empty');
export const addressCheck = check('address')
  . exists()
  . withMessage('Address Field is missing')
  . isLength({ min: 1 })
  . withMessage('Address Field cannot be empty');

export const carIdCheck = check('car_id').exists()
  .withMessage('No car id supplied')
  .isInt({ min: 1 })
  .withMessage('Car id must be a positive integer')
  .trim()
  .toInt();


export const priceCheck = check('amount').exists()
  .withMessage('Price is not supplied')
  .isInt({ min: 1 })
  .withMessage('Price must be a positive integer')
  .trim();


export const reasonCheckCheck = check('reason').exists()
  .withMessage('Reason Field is missing').custom((value, { req }) => {
    const queryObj = req.body.reason;
    const options = ['pricing', 'weird demands', 'others'];
    if (!options.includes(queryObj)) {
      throw new Error('Invalid Reason option');
    }

    return true;
  })
  .trim()
  .toString();

export const descriptionCheck = check('description').exists()
  .withMessage('Description Field is missing')
  .trim()
  .toString();

export const orderIdParamCheck = param('orderId').exists()
  .isInt({ min: 1 }).withMessage('Order id must be a positive integer')
  .not()
  .contains('.')
  .withMessage('Order id must be a positive integer')
  .trim();

export const carIdParamCheck = param('carId').exists()
  .isInt({ min: 1 }).withMessage('Car id must be a positive integer')
  .not()
  .contains('.')
  .withMessage('Car id must be a positive integer')
  .trim();

export const carStatusParamCheck = param('carStatus').exists()
  .equals('sold')
  .withMessage('You are only allowed to update Car status as sold')
  .optional('nullable')
  .trim();

export const priceOptionalCheck = check('amount').exists()
  .withMessage('Price is not supplied')
  .isFloat({ min: 1 })
  .withMessage('Price must be a positive integer')
  .optional('nullable')
  .trim();

export const statusQueryCheck = query('status').equals('available').withMessage('Invalid status parameter').optional('nullable')
  .trim()
  .toString();
export const minQueryCheck = query('min_price').isFloat({ min: 0 }).withMessage('Price range should be a positive number').optional('nullable')
  .trim()
  .toFloat();
export const maxQueryCheck = query('max_price').isFloat({ min: 0 }).withMessage('Price range should be a positive number').optional('nullable')
  .trim()
  .toFloat();

const isValidNumberOfParameter = (queryObj, number) => {
  if (Object.keys(queryObj).length !== number) {
    throw new Error('Incorrect number of parameters');
  }
};


export const arefieldsTheSameQueryCheck = query('max_price').custom((value, { req }) => {
  const queryObj = req.query;

  isValidNumberOfParameter(queryObj, 3);


  if (queryObj.min_price === queryObj.max_price) {
    throw new Error('Max and Min values cannot be the same');
  }
  if (queryObj.min_price > queryObj.max_price) {
    throw new Error('Min value is greater than Max value');
  }


  return true;
}).optional();


export const usedStatusQueryCheck = query('state').custom((value, { req }) => {
  const queryObj = req.query;

  if (!queryObj.status) {
    throw new Error('Availability Status is not set');
  }
  isValidNumberOfParameter(queryObj, 2);

  if (!queryObj.state) {
    throw new Error('No state value given');
  }

  if (queryObj.state !== 'used' && queryObj.state !== 'new') {
    throw new Error('Incorrect state value');
  }


  return true;
}).optional('nullable');

export const bodyTypeQueryCheck = query('body_type').custom((value, { req }) => {
  const queryObj = req.query;


  isValidNumberOfParameter(queryObj, 1);

  if (!queryObj.body_type) {
    throw new Error('Body type value is missing');
  }

  return true;
}).optional('nullable')
  .isAlpha()
  .withMessage('Body type should only contain alphabet')
  .toString();


export const manufacturerQueryCheck = query('manufacturer').custom((value, { req }) => {
  const queryObj = req.query;
  if (!req.query.status) {
    throw new Error('Availability Status is not set');
  }

  isValidNumberOfParameter(queryObj, 2);

  if (!queryObj.manufacturer) {
    throw new Error('Manufacturer value is missing');
  }

  return true;
}).optional('nullable')
  .isAlpha()
  .withMessage('Manufacturer should only contain alphabet')
  .toString();


export const priceParamCheck = param('newPrice').exists()
  .isFloat({ min: 1 })
  .withMessage('New Price must be a positive number')
  .trim();

const sanitize = name => sanitizeParam(name).toInt();

export const orderIdSanitizer = sanitize('orderId');
export const carIdSanitizer = sanitize('carId');
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
      return res.status(401).json({ status: 401, error: 'Unauthorized' });
    }

    next();
  } else {
    // If header is undefined
    return res.status(401).json({ status: 401, error: 'Unauthorized' });
  }
};
