import Order from './order';

class Car {
  constructor() {
    this.cars = [{
      id: 1,
      owner: 1,
      createdOn: Date.now(),
      state: 'new',
      status: 'available',
      price: 1.4,
      manufacturer: 'mercedes',
      model: '2014',
      body_type: 'trailer',
    },
    {
      id: 2,
      owner: 2,
      createdOn: Date.now(),
      state: 'used',
      status: 'available',
      price: 1.8,
      manufacturer: 'honda',
      model: '2015',
      body_type: 'coupe',
    },
    {
      id: 3,
      owner: 3,
      createdOn: Date.now(),
      state: 'used',
      status: 'available',
      price: 2.8,
      manufacturer: 'mercedes',
      model: '2014',
      body_type: 'suv',
    }, {
      id: 4,
      owner: 1,
      createdOn: Date.now(),
      state: 'new',
      status: 'sold',
      price: 1.9,
      manufacturer: 'mercedes',
      model: '2014',
      body_type: 'trailer',
    },
    {
      id: 5,
      owner: 3,
      createdOn: Date.now(),
      state: 'used',
      status: 'available',
      price: 2.8,
      manufacturer: 'buggati',
      model: '2014',
      body_type: 'coupe',
    },
    {
      id: 6,
      owner: 3,
      createdOn: Date.now(),
      state: 'used',
      status: 'available',
      price: 2.8,
      manufacturer: 'buggati',
      model: '2014',
      body_type: 'coupe',
    },
    {
      id: 7,
      owner: 3,
      createdOn: Date.now(),
      state: 'used',
      status: 'available',
      price: 2.8,
      manufacturer: 'buggati',
      model: '2014',
      body_type: 'coupe',
    },
    {
      id: 8,
      owner: 1,
      createdOn: Date.now(),
      state: 'used',
      status: 'sold',
      price: 2.8,
      manufacturer: 'buggati',
      model: '2014',
      body_type: 'coupe',
    },
    {
      id: 9, // this car id will not be ordered for during test
      owner: 1,
      createdOn: Date.now(),
      state: 'used',
      status: 'available',
      price: 2.8,
      manufacturer: 'volkswagen',
      model: '2016',
      body_type: 'coupe',
    },
    {
      id: 10, // this car id be  for during test
      owner: 1,
      createdOn: Date.now(),
      state: 'used',
      status: 'available',
      price: 2.8,
      manufacturer: 'volkswagen',
      model: '2016',
      body_type: 'coupe',
    },
    ];
    this.lastInsertId = this.cars.length;
  }

  markAsSold(params, userId) {
    const { carId } = params;

    const car = this.doesCarExist(carId);
    if (!car) {
      return { error: 'Car id does not exists' };
    }

    if (car.owner !== userId) {
      return { error: 'You cannot update an ad you did not create' };
    }

    if (car.status === 'sold') {
      return { error: 'Status is sold. Update not performed' };
    }

    const orders = this.getOrders().getOrdersByCarId(carId);
    if (orders.length === 0) {
      return { error: 'You cannot mark an unordered ad as sold' };
    }
    const acceptedOrder = orders.find(order => order.status === 'accepted' && order.carId === carId);

    if (!acceptedOrder) {
      return { error: 'You cannot mark an unaccepted ad as sold' };
    }
    car.status = 'sold';
    this.update(carId, car);
    return car;
  }

  getSingleCar(carId) {
    const car = this.doesCarExist(carId);

    if (!car) {
      return { error: 'Car id does not exists' };
    }
    if (car.status === 'sold') {
      return { error: 'This car is currently not available' };
    }
    return car;
  }

  doesCarExist(id) {
    return this.cars.find(car => car.id === id);
  }

  update(carId, newCar) {
    this.cars.map((car) => {
      if (car.id === carId) {
        return newCar;
      }
      return car;
    });
  }

  getOrders() {
    if (!this.orders) this.orders = new Order(this);
    return this.orders;
  }
}
export default new Car();
