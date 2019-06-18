import OrderService from '../../services/controller/order';
import Result from '../../helpers/result';
import Validator from '../../helpers/validator';

class Order {
  static async makeOrder(req, res) {
    const error = Validator.validate(req, res);

    if (error) return error;


    const orderObject = await OrderService.makeOrder(req.body, req.user.id);

    const result = Promise.resolve(orderObject);

    return result.then(
      order => Result.getResult(res, order, false, 201),
    );
  }

  static async updateOrder(req, res) {
    const error = Validator.validate(req, res);

    if (error) return error;


    const orderObject = await OrderService.updateOrder(req.params, req.user.id);

    const result = Promise.resolve(orderObject);

    return result.then(
      order => Result.getResult(res, order, false, 200),
    );
  }
}
export default Order;
