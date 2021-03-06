import CarService from './car';
import { query } from '../../db';

class OrderService {
  static async makeOrder(data, userId) {
    const { amount } = data;
    const carId = data.car_id;
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

  static async updateOrder(data, userId) {
    const { orderId, newPrice } = data;
    const getOrderProperty = OrderService.getOrderProperties(orderId);
    return getOrderProperty.then((order) => {
      if (!order) {
        return { code: 404, error: 'Purchase order does not exist' };
      }

      const {
        amount, status, buyer, price,
      } = order;

      if (Number(buyer) !== userId) {
        return { code: 400, error: 'This purchase order was not made by you' };
      }

      if (status !== 'pending') {
        return { code: 400, error: 'You cannot update the price of a non pending purchase order' };
      }


      if (newPrice === Number(amount)) {
        return { code: 400, error: 'Current Price is the same as supplied price' };
      }

      const getCarPromise = OrderService.updateOrderQuery(orderId, amount, newPrice, price);
      return getCarPromise.then(
        newOrder => newOrder,
      );
    });
  }


  static async makeOrderQuery(userId, carId, amount) {
    const queryString = 'INSERT INTO orders (buyer, car_id, amount ) VALUES ($1,$2,$3) RETURNING *;';
    const value = [userId, carId, amount];
    const { rows } = await query(queryString, value);

    const {
      amount: priceOffered, ...rest
    } = rows[0];

    return {
      price_offered: priceOffered,
      ...rest,
    };
  }

  static async updateOrderQuery(orderId, oldPriceOffered, newPrice, price) {
    const queryString = 'UPDATE orders SET amount = $2 WHERE id=$1 RETURNING *;';
    const value = [orderId, newPrice];
    const { rows } = await query(queryString, value);
    const {
      amount: newPriceOffered, ...rest
    } = rows[0];


    return {
      old_price_offered: oldPriceOffered,
      new_price_offered: newPriceOffered,
      price,
      ...rest,
    };
  }


  static getHistory(userId) {
    const queryString = 'SELECT orders.id, cars.id as car_id,buyer, orders.amount,cars.price, cars.owner,orders.status,orders.created_on FROM orders INNER JOIN cars ON cars.id = orders.car_id WHERE orders.buyer = $1;';
    const getCarPromise = OrderService.getOrderQuery(queryString, userId);
    return getCarPromise.then(
      data => data,
    );
  }

  static async doesOrderExist(carId, userId) {
    const queryString = 'SELECT id FROM orders WHERE car_id = $1 AND buyer= $2 ;';
    const value = [carId, userId];
    const { rows } = await query(queryString, value);
    if (rows.length !== 0) { return true; }
    return false;
  }

  static async getOrderProperties(id) {
    const queryString = 'SELECT orders.amount,orders.status,buyer, cars.price FROM orders INNER JOIN cars ON cars.id = orders.car_id WHERE orders.id = $1 ;';
    const value = [id];
    const { rows } = await query(queryString, value);
    if (rows.length === 0) { return false; }
    return rows[0];
  }

  static async getOrderQuery(queryString, id) {
    const value = [id];
    const { rows } = await query(queryString, value);
    const result = [];
    rows.forEach((row) => {
      const {
        amount: priceOffered,
        ...rest
      } = row;

      result.push({
        ...rest, price_offered: priceOffered,
      });
    });

    return result;
  }
}

export default OrderService;
