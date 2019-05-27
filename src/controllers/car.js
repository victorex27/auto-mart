
import url from 'url';
import cloudinary from 'cloudinary';
import formidable from 'formidable';
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

  static postCarAd(req, res) {
    new formidable.IncomingForm().parse(req, (err, fields, files) => {
      const { dataFile } = files;
      if (!dataFile) {
        return res.status(400).json({ status: 400, error: 'Invalid File name parameter supplied' });
      }
      const validation = Car.validation(dataFile, fields);
      if (validation.error) {
        return res.status(400).json({ status: 400, error: validation.error });
      }
      const cloudinaryUrl = url.parse(process.env.CLOUDINARY_URL);

      cloudinary.config({
        cloud_name: cloudinaryUrl.host,
        api_key: cloudinaryUrl.auth.split(':')[0],
        api_secret: cloudinaryUrl.auth.split(':')[1],
      });
      return cloudinary.v2.uploader
        .upload(dataFile.path, { tags: 'gotemps', resource_type: 'auto' })
        .then(file => Result.getResult(res, CarModel.createCar(fields, req.user.id, file.url), false));
    });
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
      return res.status(400).json({ status: 400, error: 'Invalid Query Parameter was supplied' });
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

  static validation(dataFile, fields) {
    const type = dataFile.type.substr(6);

    if (!['png', 'jpg', 'jpeg', 'gif'].includes(type)) {
      return { error: 'Allowed File type [\'png\', \'jpg\', \'jpeg\', \'gif\']' };
    }

    if (dataFile.size > 409600) {
      return { error: 'File Size should not exceed 400KB' };
    }

    if (!fields.state) {
      return { error: 'State Field is missing' };
    }

    if (fields.state !== 'new' && fields.state !== 'used') {
      return { error: 'State Field must be new or old' };
    }

    if (!fields.manufacturer) {
      return { error: 'Manufacturer Field is missing' };
    }

    if (!fields.price) {
      return { error: 'Price Field does not exist' };
    }
    const price = Number.parseFloat(fields.price);
    if (Number.isNaN(price) || price <= 0) {
      return { error: 'Price Field must be a positive number' };
    }

    if (!fields.bodyType) {
      return { error: 'Body Type Field does not exist' };
    }

    if (!fields.model) {
      return { error: 'Model Field does not exist' };
    }

    return '';
  }
}

export default Car;
