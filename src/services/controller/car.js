import { query } from '../db/index';

class CarService {
  static createCar(body, userId, url) {
    const getCarPromise = CarService.createCarQuery(body, userId, url);
    return getCarPromise.then(
      data => data,
    );
  }

  static getSingleCar(carId) {
    const getCarPromise = CarService.getSingleCarQuery(carId);
    return getCarPromise.then(
      (data) => {
        if (!data) {
          return { code: 404, error: 'Car id does not exist' };
        }
        return data;
      },
    );
  }

  static getAllCarsByBodyType(bodyType) {
    const getCarPromise = CarService.getAllCarsByBodyTypeQuery(bodyType);
    return getCarPromise.then(
      data => data,
    );
  }

  static async getAllUnsoldAvailableCarsByRange(min, max) {
    const getCarPromise = CarService.getAllUnsoldAvailableCarsByRangeQuery([min, max]);
    return getCarPromise.then(
      data => data,
    );
  }

  static getAllCarsByManufacturer(manufacturer) {
    const getCarPromise = CarService.getAllCarsByManufacturerQuery(manufacturer);
    return getCarPromise.then(
      data => data,
    );
  }

  static getAllUnsoldAvailableCars(state) {
    let getCarPromise;
    if (state) {
      getCarPromise = CarService.getAvailableCarQuery(state);
    } else {
      getCarPromise = CarService.getAvailableCarQuery();
    }

    return getCarPromise.then(
      data => data,
    );
  }

  static getAllCars(isAdmin) {
    if (!isAdmin) {
      return { code: 403, error: 'Only an admin is allowed retrieve all cars' };
    }
    const getCarPromise = CarService.getAllCarsQuery();
    return getCarPromise.then(
      data => data,
    );
  }

  static async createCarQuery(body, userId, url) {
    const queryString = 'INSERT INTO cars (owner,state,status, price, manufacturer, model, body_type, url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *; ';
    const value = [
      userId,
      body.state,
      'available',
      body.price,
      body.manufacturer,
      body.model,
      body.bodyType,
      url,
    ];
    const { rows } = await query(queryString, value);
    const { created_on: createdOn, body_type: bodyType, ...rest } = rows[0];

    return { ...rest, bodyType, createdOn };
  }


  static async getAvailableCarQuery(state) {
    let queryString = 'SELECT * FROM cars WHERE status=\'available\' ';
    let value = [];
    if (state) {
      queryString += ' AND state = $1';
      value = [state];
    }
    return CarService.customQuery(queryString, value);
  }

  static async getAllCarsQuery() {
    const queryString = 'SELECT * FROM cars';
    const value = [];
    return CarService.customQuery(queryString, value);
  }

  static async getSingleCarQuery(carId) {
    // let queryString = 'SELECT * FROM cars WHERE status=\'available\' ';
    let queryString = 'SELECT * FROM cars  ';
    queryString += ' WHERE cars.id = $1';
    const value = [carId];
    const { rows } = await query(queryString, value);
    if (rows[0]) {
      const { created_on: createdOn, body_type: bodyType, ...rest } = rows[0];

      return { ...rest, bodyType, createdOn };
    }
    return undefined;
  }

  static async getAllCarsByManufacturerQuery(manufacturer) {
    let queryString = 'SELECT * FROM cars WHERE status=\'available\' ';
    queryString += ' AND manufacturer = $1';
    const value = [manufacturer];
    return CarService.customQuery(queryString, value);
  }

  static async getAllUnsoldAvailableCarsByRangeQuery(range) {
    let queryString = 'SELECT * FROM cars WHERE status=\'available\' ';
    queryString += ' AND price >= $1 AND price <= $2 ;';
    const value = range;
    return CarService.customQuery(queryString, value);
  }

  static async getAllCarsByBodyTypeQuery(bodyType) {
    let queryString = 'SELECT * FROM cars WHERE status=\'available\' ';
    queryString += ' AND body_type = $1';
    const value = [bodyType];
    return CarService.customQuery(queryString, value);
  }

  static async customQuery(queryString, value) {
    const { rows } = await query(queryString, value);
    const result = [];
    rows.forEach((row) => {
      const { created_on: createdOn, body_type: bodyType, ...rest } = row;

      result.push({ ...rest, bodyType, createdOn });
    });

    return result;
  }
}

export default CarService;
