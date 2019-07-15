import url from 'url';
import cloudinary from 'cloudinary';
import formidable from 'formidable';
import CarService from '../../services/controller/v1/car';
import Result from '../../helpers/result';
import Validator from '../../helpers/validator';


class Car {
  static async update(req, res) {
    const error = Validator.validate(req, res);
    if (error) return error;

    const { car, carId } = req.params;
    const status = car;
    const newPrice = Number(car);
    let carObject;

    if (Number.isNaN(newPrice)) {
      carObject = await CarService.markAsSold(carId, req.user.id, status);
    } else {
      carObject = await CarService.updateCarPrice(carId, req.user.id, newPrice);
    }
    const result = Promise.resolve(carObject);
    return result.then(
      cars => Result.getResult(res, cars, false, 200),
    );
  }

  static async postCarAd(req, res) {
    new formidable.IncomingForm().parse(req, async (err, fields, files) => {
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
        .then(async (file) => {
          const carObject = await CarService.createCar(fields, req.user.id, file.url);
          const result = Promise.resolve(carObject);
          return result.then(
            cars => Result.getResult(res, cars, false, 201),
          );
        });
    });
  }

  static async getSingleCar(req, res) {
    const error = Validator.validate(req, res);
    if (error) return error;

    const carObject = await CarService.getSingleCar(req.params.carId);

    const result = Promise.resolve(carObject);

    return result.then(
      cars => Result.getResult(res, cars, false, 200),
    );
  }


  static async getAllUnsoldAvailableCars(req, res) {
    const error = Validator.validate(req, res);
    if (error) return error;

    const {
      status, state, manufacturer,
    } = req.query;

    const min = req.query.min_price;
    const max = req.query.max_price;

    const bodyType = req.query.body_type;
    const arrayQueryParameter = Object.keys(req.query);

    const found = arrayQueryParameter.every(r => ['min_price', 'max_price', 'status', 'state', 'body_type', 'manufacturer'].indexOf(r) >= 0);
    if (!found && arrayQueryParameter.length > 0) {
      return res.status(400).json({ status: 400, error: 'Invalid Query Parameter was supplied' });
    }

    let carObject;

    if (bodyType) {
      carObject = await CarService.getAllCarsByBodyType(bodyType);
    } else if (manufacturer) {
      carObject = await CarService.getAllCarsByManufacturer(manufacturer);
    } else if (max && min) {
      carObject = await CarService.getAllUnsoldAvailableCarsByRange(min, max);
    } else if (state && (state === 'used' || state === 'new')) {
      carObject = await CarService.getAllUnsoldAvailableCars(state);
    } else if (status && !state) {
      carObject = await CarService.getAllUnsoldAvailableCars();
    } else {
      carObject = await CarService.getAllCars(req.user.isAdmin);
    }

    const result = Promise.resolve(carObject);

    return result.then(
      cars => Result.getResult(res, cars, true, 200),
    );
  }

  static async getDeleteCar(req, res) {
    const error = Validator.validate(req, res);

    if (error) return error;

    const carObject = await CarService.getDeleteCar(req.params.carId, req.user.isAdmin);
    const result = Promise.resolve(carObject);

    return result.then(
      cars => Result.getResult(res, cars, false, 200),
    );
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
