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
    ];


    this.lastInsertId = this.orders.length;
  }

  makeOrder(data, userId) {
    // does car id exist
    let { carId } = data;
    carId = parseInt(carId);

    const car = Car.doesCarExist(carId);
    if (!car) {
      return { error: 'Car id does not exist' };
    }
    // does the car belong to current user

    if (Car.doesCarBelongToBuyer(carId, userId)) {
      return { error: 'You cannot make a purchase order for your stock' };
    }

    const order = this.doesOrderExist(carId, userId);
    // has the user made this order before
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

  doesOrderExist(id, userId) {
    return this.orders.find(order => order.carId === id && order.buyer === userId);
  }
}
export default new Order();
