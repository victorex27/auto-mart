import CarModel from '../models/car';
import Result from '../helpers/result';
import Validator from '../helpers/validator';


class Car {
  static markAsSold(req, res) {
    const error = Validator.validate(req, res);
    if (error) return error;
    return Result.getResult(res, CarModel.markAsSold(req.params, req.user.id), false);
  }

  static getSingleCar(req, res) {
    const error = Validator.validate(req, res);

    if (error) return error;

    return Result.getResult(res, CarModel.getSingleCar(req.params.carId), false);
  }

  static getDeleteCar(req, res) {
    const error = Validator.validate(req, res);

    if (error) return error;

    return Result.getResult(res, CarModel.getDeleteCar(req.params.carId, req.user.isAdmin), false);
  }

  static getAllUnsoldAvailableCars(req, res) {
    const error = Validator.validate(req, res);

    if (error) return error;

    const { min, max, status } = req.query;

    const arrayQueryParameter = Object.keys(req.query);
    const found = arrayQueryParameter.every(r => ['min', 'max', 'status'].indexOf(r) >= 0);


    if (!found && arrayQueryParameter.length > 0) {
      return res.status(400).json({ status: 403, error: 'Malformed Path' });
    }

    if (max && min) {
      return Result.getResult(res, CarModel.getAllUnsoldAvailableCarsByRange(min, max), true);
    }

    if (status && status === 'available') {
      return Result.getResult(res, CarModel.getAllUnsoldAvailableCars(), true);
    }

    return Result.getResult(res, CarModel.getAllCars(req.user.isAdmin), true);
  }
}

export default Car;
