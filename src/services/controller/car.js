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

  static getAllUnsoldAvailableCars() {
    const getCarPromise = CarService.getAvailableCarQuery();
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
    const { rows } = await query(queryString, value);
    const result = [];
    rows.forEach((row) => {
      const { created_on: createdOn, body_type: bodyType, ...rest } = row;

      result.push({ ...rest, bodyType, createdOn });
    });

    return result;
  }

  static async getSingleCarQuery(carId) {
    // let queryString = 'SELECT * FROM cars WHERE status=\'available\' ';
    let queryString = 'SELECT * FROM cars  ';
    queryString += ' WHERE cars.id = $1';
    const value = [carId];
    const { rows } = await query(queryString, value);

    return rows[0];
  }
}

export default CarService;
