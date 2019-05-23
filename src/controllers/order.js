import { validationResult } from 'express-validator/check';
import OrderModel from '../models/order';
import CarModel from '../models/car';

const orderModel = new OrderModel(CarModel);
class Order {
  static makeOrder(req, res) {


    const error = Order.validate(req);
    if (error) {
      return res.status(400).json({ status: 400, error });
    }
    const order = orderModel.makeOrder(req.body, req.user.id);
    return Order.getResult(res, order);
  }

  static updateOrder(req, res) {
    const error = Order.validate(req);
    if (error) {
      return res.status(400).json({ status: 400, error });
    }
    const order = orderModel.updateOrder(req.params, req.user.id);

    return Order.getResult(res, order);
  }

  static validate(req) {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return '';
    }
    const error = errors.array();
    return error[0].msg;
  }

  static getResult(res, order) {
    if (order.error) {
      return res.status(400).json({ status: 400, error: order.error });
    }
    return res.status(201).json({ status: 201, data: { ...order } });
  }
}

export default Order;
