import CarModel from '../models/car';
import Result from '../helpers/result';
import Validator from '../helpers/validator';

class Car {
  static markAsSold(req, res) {
    const error = Validator.validate(req, res);
    if (error) return error;

    const { car, carId } = req.params;
    const status = car;
    const newPrice = Number(car);

    if (Number.isNaN(newPrice)) {
      return Result.getResult(res, CarModel.markAsSold(carId, req.user.id, status), false);
    }

    return Result.getResult(res, CarModel.updateCarPrice(carId, req.user.id, newPrice), false);
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

    const {
      min, max, status, state, manufacturer,
    } = req.query;

    const bodyType = req.query.body_type;
    const arrayQueryParameter = Object.keys(req.query);

    const found = arrayQueryParameter.every(r => ['min', 'max', 'status', 'state', 'body_type', 'manufacturer'].indexOf(r) >= 0);
    if (!found && arrayQueryParameter.length > 0) {
      return res.status(403).json({ status: 403, error: 'Invalid Query Parameter was supplied' });
    }

    if (bodyType) {
      return Result.getResult(res, CarModel.getAllCarsByBodyType(bodyType), true);
    }


    if (manufacturer) {
      return Result.getResult(res, CarModel.getAllCarsByManufacturer(manufacturer), true);
    }


    if (max && min) {
      return Result.getResult(res, CarModel.getAllUnsoldAvailableCarsByRange(min, max), true);
    }

    if (state && (state === 'used' || state === 'new')) {
      return Result.getResult(res, CarModel.getAllUnsoldAvailableCars(state), true);
    }

    if (status) {
      return Result.getResult(res, CarModel.getAllUnsoldAvailableCars(), true);
    }
    return Result.getResult(res, CarModel.getAllCars(req.user.isAdmin), true);
  }
}

export default Car;
