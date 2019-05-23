import { validationResult } from 'express-validator/check';
import CarModel from '../models/car';


class Car {
  static markAsSold(req, res) {
    const error = Car.validate(req);
    if (error) {
      return res.status(400).json({ status: 400, error });
    }
    const car = CarModel.markAsSold(req.params, req.user.id);
    return Car.getResult(res, car);
  }

  static validate(req) {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return '';
    }
    const error = errors.array();
    return error[0].msg;
  }

  static getResult(res, car) {
    if (car.error) {
      return res.status(400).json({ status: 400, error: car.error });
    }
    return res.status(201).json({ status: 201, data: { ...car } });
  }
}

export default Car;
