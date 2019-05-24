import OrderModel from '../models/order';
import CarModel from '../models/car';
import Result from '../helpers/result';
import Validator from '../helpers/validator';

const orderModel = new OrderModel(CarModel);
class Order {
  static makeOrder(req, res) {
    const error = Validator.validate(req, res);
    if (error) return error;
    return Result.getResult(res, orderModel.makeOrder(req.body, req.user.id), false);
  }

  static updateOrder(req, res) {
    const error = Validator.validate(req, res);
    if (error) return error;
    return Result.getResult(res, orderModel.updateOrder(req.params, req.user.id), false);
  }
}
export default Order;
