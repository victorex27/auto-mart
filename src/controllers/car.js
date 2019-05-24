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

    const { min, max } = req.query;

    if (max && min) {
      return Result.getResult(res, CarModel.getAllUnsoldAvailableCarsByRange(min, max), true); //  is expected multiple
    }

    return Result.getResult(res, CarModel.getAllUnsoldAvailableCars(), true);
  }
}

export default Car;
