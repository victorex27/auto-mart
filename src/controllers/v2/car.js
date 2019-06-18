import url from 'url';
import cloudinary from 'cloudinary';
import formidable from 'formidable';
import CarService from '../../services/controller/car';
import Result from '../../helpers/result';
// import Validator from '../../helpers/validator';


class Car {
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
          const ers = Promise.resolve(carObject);
          return ers.then(
            cars => Result.getResult(res, cars, false, 201),
          );
        });
    });
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
