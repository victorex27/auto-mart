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
      id: 9,
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
      id: 10,
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
      id: 11,
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
      id: 12,
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
      id: 13,
      owner: 1,
      createdOn: Date.now(),
      state: 'used',
      status: 'sold',
      price: 2.8,
      manufacturer: 'volkswagen',
      model: '2016',
      body_type: 'coupe',
    },
    {
      id: 14,
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

  markAsSold(carId, userId, status) {
    if (status === 'available') {
      return { error: 'You are only allowed to update Car status as sold' };
    }
    if (status !== 'sold') {
      return { error: 'Malformed Path' };
    }


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


  updateCarPrice(carId, userId, newPrice) {
    const car = this.doesCarExist(carId);
    if (!car) {
      return { error: 'Car id does not exists' };
    }

    if (car.owner !== userId) {
      return { error: 'You cannot update an ad you did not create' };
    }

    if (car.status === 'sold') {
      return { error: 'Car is already marked as sold. You cannot update price' };
    }

    car.price = newPrice;
    this.update(carId, car);
    return car;
  }

  getSingleCar(carId) {
    const car = this.doesCarExist(carId);

    if (!car) {
      return { error: 'Car id does not exists' };
    }
    return car;
  }

  getDeleteCar(carId, isAdmin) {
    const car = this.doesCarExist(carId);

    if (!car) {
      return { error: 'Car id does not exists' };
    }

    if (!isAdmin) {
      return { error: 'Only admins are allowed to delete car adverts' };
    }


    for (let i = 0; i < this.cars.length; i += 1) {
      if (this.cars[i].id === carId) {
        this.cars.splice(i, 1);
        break;
      }
    }


    return 'delete';
  }

  getAllUnsoldAvailableCars(state) {
    if (state) {
      return this.cars.reduce((acc, car) => {
        if (car.status === 'available' && car.state === state) {
          acc.push(car);
        }
        return acc;
      }, []);
    }

    return this.cars.reduce((acc, car) => {
      if (car.status === 'available') {
        acc.push(car);
      }
      return acc;
    }, []);
  }

  getAllCars(isAdmin) {
    if (!isAdmin) {
      return { error: 'Only an admin is allowed retrieve all cars' };
    }

    return this.cars;
  }

  getAllUnsoldAvailableCarsByRange(min, max) {
    return this.cars.reduce((acc, car) => {
      if (car.status === 'available' && car.price >= min && car.price <= max) {
        acc.push(car);
      }
      return acc;
    }, []);
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
