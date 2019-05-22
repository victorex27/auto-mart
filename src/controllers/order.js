import { validationResult } from 'express-validator/check';
import OrderModel from '../models/order';


class Order {
  static makeOrder(req, res) {
    const order = OrderModel.makeOrder(req.body, req.user.id);

    Order.getResult(req, res, order);
  }


  static getResult(req, res, order) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = errors.array();
      return res.status(400).json({ status: 400, error: error[0].msg });
    }

    if (order.error) {
      return res.status(400).json({ status: 400, error: order.error });
    }


    return res.status(201).json({ status: 201, data: { ...order } });
  }
}

export default Order;
