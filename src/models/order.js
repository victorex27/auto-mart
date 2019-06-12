import orderData from './data/order';

class Order {
  constructor(cars) {
    this.cars = cars;
    this.orders = orderData;
    this.lastInsertId = this.orders.length;
  }

  makeOrder(data, userId) {
    const { carId } = data;
    const car = this.getCars().doesCarExist(carId);
    if (!car) {
      return { code: 404, error: 'Car id does not exist' };
    }

    if (car.id === carId && car.owner === userId) {
      return { code: 400, error: 'You cannot make a purchase order for your stock' };
    }

    const order = this.doesOrderExistByCarId(carId, userId);
    if (order) {
      return { code: 400, error: 'Purchase Order already exists' };
    }


    const newOrder = {
      id: this.lastInsertId + 1,
      buyer: userId,
      carId,
      priceOffered: data.amount,
      price: car.price,
      status: 'pending',
      createdOn: Date.now(),
    };
    this.lastInsertId = this.lastInsertId + 1;

    this.orders.push(newOrder);

    return newOrder;
  }

  updateOrder(params, userId) {
    const { orderId, newPrice } = params;

    const order = this.doesOrderExistByOrderId(orderId);

    if (!order) {
      return { code: 404, error: 'Purchase order does not exist' };
    }

    if (order.buyer !== userId) {
      return { code: 400, error: 'This purchase order was not made by you' };
    }

    if (order.status !== 'pending') {
      return { code: 400, error: 'You cannot update the price a non pending purchase order' };
    }

    if (order.priceOffered === newPrice) {
      return { code: 400, error: 'Current Price is the same as supplied price' };
    }
    const oldPrice = order.priceOffered;
    order.priceOffered = newPrice;
    this.update(orderId, order);

    return {
      ...order,
      oldPriceOffered: oldPrice,
      newPriceOffered: newPrice,
    };
  }

  doesOrderExistByCarId(carId, userId) {
    return this.orders.find(order => order.carId === carId && order.buyer === userId);
  }

  doesOrderExistByOrderId(orderId) {
    return this.orders.find(order => order.id === orderId);
  }

  update(orderId, newOrder) {
    this.orders.map((order) => {
      if (order.id === orderId) {
        return newOrder;
      }
      return order;
    });
  }

  getOrdersByCarId(carId) {
    return this.orders.reduce((acc, order) => {
      if (order.carId === carId) {
        acc.push(order);
      } return acc;
    }, []);
  }

  getCars() {
    return this.cars;
  }
}
export default Order;
