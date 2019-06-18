import { query } from '../db/index';

class CarService {
  static createCar(body, userId, url) {
    const getCarPromise = CarService.createCarQuery(body, userId, url);
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
}

export default CarService;
