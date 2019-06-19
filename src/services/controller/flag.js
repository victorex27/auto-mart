import CarService from './car';
import { query } from '../db';

class FlagService {
  static createFlag(userId, body) {
    const { carId, reason, description } = body;

    const doesCarExistPromise = CarService.getSingleCar(carId);
    const doesCarBelongToUser = CarService.doesCarBelongToUser(carId, userId);

    return doesCarExistPromise.then((doesCarExist) => {
      if (doesCarExist.code === 404) {
        return doesCarExist;// returns an object of the status and  error message
      }
      return doesCarBelongToUser.then((order) => {
        if (order) {
          return { code: 400, error: 'You cannot report your own ad' };
        }
        const getCarPromise = FlagService.postFlag(userId, carId, reason, description);
        return getCarPromise.then(
          data => data,
        );
      });
    });
  }

  static async postFlag(user, car, reason, description) {
    const queryString = 'INSERT INTO flags ( user_id, car_id, reason, description ) VALUES ($1,$2,$3,$4) RETURNING *;';
    const value = [user, car, reason, description];
    const { rows } = await query(queryString, value);
    const {
      car_id: carId, created_on: createdOn, user_id: userId, ...rest
    } = rows[0];


    return {
      carId,
      userId,
      createdOn,
      ...rest,
    };
  }
}

export default FlagService;
