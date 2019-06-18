import Order from './order';
import carData from './data/car';

class Car {
  constructor() {
    this.cars = carData;
    this.lastInsertId = this.cars.length;
  }

  createCar(body, userId, url) {
    const newCar = {
      id: this.lastInsertId + 1,
      owner: userId,
      createdOn: Date.now(),
      state: body.state,
      status: 'available',
      price: body.price,
      manufacturer: body.manufacturer,
      model: body.model,
      bodyType: body.bodyType,
      url,
    };
    this.lastInsertId = this.lastInsertId + 1;

    this.cars.push(newCar);

    return newCar;
  }

  markAsSold(carId, userId, status) {
    if (status === 'available') {
      return { code: 400, error: 'You are only allowed to update Car status as sold' };
    }
    if (status !== 'sold') {
      return { code: 400, error: 'Malformed Path' };
    }

    const car = this.doesCarExist(carId);

    if (!car) {
      return { code: 404, error: 'Car id does not exist' };
    }

    if (car.owner !== userId) {
      return { code: 400, error: 'You cannot update an ad you did not create' };
    }

    if (car.status === 'sold') {
      return { code: 400, error: 'Status is sold. Update not performed' };
    }

    const orders = this.getOrders().getOrdersByCarId(carId);
    if (orders.length === 0) {
      return { code: 400, error: 'You cannot mark an unordered ad as sold' };
    }
    const acceptedOrder = orders.find(order => order.status === 'accepted' && order.carId === carId);

    if (!acceptedOrder) {
      return { code: 400, error: 'You cannot mark an unaccepted ad as sold' };
    }
    car.status = 'sold';
    this.update(carId, car);
    return car;
  }


  updateCarPrice(carId, userId, newPrice) {
    const car = this.doesCarExist(carId);
    if (!car) {
      return { code: 404, error: 'Car id does not exist' };
    }

    if (car.owner !== userId) {
      return { code: 400, error: 'You cannot update an ad you did not create' };
    }

    if (car.status === 'sold') {
      return { code: 400, error: 'Car is already marked as sold. You cannot update price' };
    }

    car.price = newPrice;
    this.update(carId, car);
    return car;
  }

  getSingleCar(carId) {
    const car = this.doesCarExist(carId);

    if (!car) {
      return { code: 404, error: 'Car id does not exist' };
    }
    return car;
  }

  getDeleteCar(carId, isAdmin) {
    const car = this.doesCarExist(carId);

    if (!car) {
      return { code: 404, error: 'Car id does not exist' };
    }

    if (!isAdmin) {
      return { code: 403, error: 'Only admins are allowed to delete car adverts' };
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

  getAllCarsByBodyType(bodyType) {
    return this.cars.reduce((acc, car) => {
      if (car.bodyType === bodyType) {
        acc.push(car);
      }
      return acc;
    }, []);
  }

  getAllCarsByManufacturer(manufacturer) {
    return this.cars.reduce((acc, car) => {
      if (car.manufacturer === manufacturer) {
        acc.push(car);
      }
      return acc;
    }, []);
  }

  getAllCars(isAdmin) {
    if (!isAdmin) {
      return { code: 403, error: 'Only an admin is allowed retrieve all cars' };
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

  belongsToOwner(userId, carId) {
    return this.cars.find(car => car.id === carId && car.owner === userId);
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
