import Car from './car';

class Order {
  constructor() {
    this.orders = [{
      id: 1,
      buyer: 1,
      carId: 3,
      priceOffered: 470000,
      price: 1400000,
      status: 'pending',
      createdOn: Date.now(),
    },
    {
      id: 2,
      buyer: 2,
      carId: 3,
      priceOffered: 470000,
      price: 1400000,
      status: 'pending',
      createdOn: Date.now(),
    },
    {
      id: 3,
      buyer: 3,
      carId: 2,
      priceOffered: 470000,
      price: 1400000,
      status: 'pending',
      createdOn: Date.now(),
    },
    {
      id: 4,
      buyer: 2,
      carId: 1,
      priceOffered: 470000,
      price: 1400000,
      status: 'pending',
      createdOn: Date.now(),
    },
    {
      id: 5,
      buyer: 3,
      carId: 1,
      priceOffered: 470000,
      price: 1400000,
      status: 'pending',
      createdOn: Date.now(),
    },
    {
      id: 6,
      buyer: 3,
      carId: 4,
      priceOffered: 470000,
      price: 1400000,
      status: 'pending',
      createdOn: Date.now(),
    },
    {
      id: 7,
      buyer: 1,
      carId: 5,
      priceOffered: 470000,
      price: 1400000,
      status: 'approved',
      createdOn: Date.now(),
    },
    {
      id: 8,
      buyer: 1,
      carId: 6,
      priceOffered: 470000,
      price: 1400000,
      status: 'pending',
      createdOn: Date.now(),
    },
    ];


    this.lastInsertId = this.orders.length;
  }

  makeOrder(data, userId) {
    const { carId } = data;
    const car = Car.doesCarExist(carId);
    if (!car) {
      return { error: 'Car id does not exist' };
    }

    if (car.id === carId && car.owner === userId) {
      return { error: 'You cannot make a purchase order for your stock' };
    }

    const order = this.doesOrderExistByCarId(carId, userId);
    if (order) {
      return { error: 'Purchase Order already exists' };
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
      return { error: 'Purchase order does not exist' };
    }

    if (order.buyer !== userId) {
      return { error: 'This purchase order was not made by you' };
    }

    if (order.status !== 'pending') {
      return { error: 'You cannot update the price a non pending purchase order' };
    }

    if (order.priceOffered === newPrice) {
      return { error: 'Current Price is the same as supplied price' };
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
}
export default new Order();
