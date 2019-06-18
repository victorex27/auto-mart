import CarService from './car';
import { query } from '../db/index';

class OrderService {
  static async makeOrder(data, userId) {
    const { carId, amount } = data;
    const doesCarExistPromise = CarService.getSingleCar(carId);
    const doesOrderExist = OrderService.doesOrderExist(carId, userId);
    return doesCarExistPromise.then((doesCarExist) => {
      if (doesCarExist.code === 404) {
        return doesCarExist;// returns an object of the status and  error message
      }

      const { owner, price } = doesCarExist;

      return doesOrderExist.then(
        (order) => {
          if (order) {
            return { code: 400, error: 'Purchase Order already exists' };
          }

          if (Number(owner) === userId) {
            return { code: 400, error: 'You cannot make a purchase order for your stock' };
          }

          const getCarPromise = OrderService.makeOrderQuery(userId, carId, amount);
          return getCarPromise.then(
            newOrder => ({
              price,
              ...newOrder,
            }),
          );
        },
      );
    });
  }


  static async makeOrderQuery(userId, carid, amount) {
    const queryString = 'INSERT INTO orders (buyer, car_id, amount ) VALUES ($1,$2,$3) RETURNING *;';
    const value = [userId, carid, amount];
    const { rows } = await query(queryString, value);

    const {
      car_id: carId, created_on: createdOn, amount: priceOffered, ...rest
    } = rows[0];

    return {
      carId,
      priceOffered,
      createdOn,
      ...rest,
    };
  }

  static async doesOrderExist(carId, userId) {
    const queryString = 'SELECT id FROM orders WHERE car_id = $1 AND buyer= $2 ;';
    const value = [carId, userId];
    const { rows } = await query(queryString, value);
    if (rows.length !== 0) { return true; }
    return false;
  }
}

export default OrderService;
