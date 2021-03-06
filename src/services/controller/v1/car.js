import { query } from '../../db';

class CarService {
  static createCar(body, userId, url) {
    const getCarPromise = CarService.createCarQuery(body, userId, url);
    return getCarPromise.then(
      data => data,
    );
  }

  static getSingleCar(carId) {
    const getCarPromise = CarService.getSingleCarQuery(carId);
    return getCarPromise.then(
      (data) => {
        if (!data) {
          return { code: 404, error: 'Car id does not exist' };
        }
        return data;
      },
    );
  }

  static getDeleteCar(carId, isAdmin) {
    if (!isAdmin) {
      return { code: 403, error: 'Only admins are allowed to delete car adverts' };
    }
    const getCarPromise = CarService.getDeleteCarQuery(carId);
    return getCarPromise.then(
      (data) => {
        if (!data) {
          return { code: 404, error: 'Car id does not exist' };
        }
        return data;
      },
    );
  }

  static getAllCarsByBodyType(bodyType) {
    const getCarPromise = CarService.getAllCarsByBodyTypeQuery(bodyType);
    return getCarPromise.then(
      data => data,
    );
  }

  static async getAllUnsoldAvailableCarsByRange(min, max) {
    const getCarPromise = CarService.getAllUnsoldAvailableCarsByRangeQuery([min, max]);
    return getCarPromise.then(
      data => data,
    );
  }

  static getAllCarsByManufacturer(manufacturer) {
    const getCarPromise = CarService.getAllCarsByManufacturerQuery(manufacturer);
    return getCarPromise.then(
      data => data,
    );
  }

  static getAllUnsoldAvailableCars(state) {
    let getCarPromise;
    if (state) {
      getCarPromise = CarService.getAvailableCarQuery(state);
    } else {
      getCarPromise = CarService.getAvailableCarQuery();
    }

    return getCarPromise.then(
      data => data,
    );
  }

  static getAllCars(isAdmin) {
    // if (!isAdmin) {
    //   return { code: 403, error: 'Only an admin is allowed retrieve all cars' };
    // }
    const getCarPromise = CarService.getAllCarsQuery();
    return getCarPromise.then(
      data => data,
    );
  }

  static async updateCarPrice(carId, userId, newPrice) {
    const doesCarExistPromise = CarService.getSingleCar(carId);

    return doesCarExistPromise.then((doesCarExist) => {
      if (doesCarExist.code === 404) {
        return doesCarExist;// returns an object of the status and  error message
      }

      const { owner, status: carstatus, price } = doesCarExist;
      if (Number(owner) !== userId) {
        return { code: 400, error: 'You cannot update an ad you did not create' };
      }

      if (carstatus === 'sold') {
        return { code: 400, error: 'Car is already marked as sold. You cannot update price' };
      }

      if (price === newPrice) {
        return { code: 400, error: 'Update not performed. New price is equal to old price' };
      }


      const getCarPromise = CarService.updateCarPriceQuery(carId, newPrice);
      return getCarPromise.then(
        data => data,
      );
    });
  }

  static async markAsSold(carId, userId, status) {
    const doesCarExistPromise = CarService.getSingleCar(carId);
    const getCarOrderProperties = CarService.getCarOrderProperties(carId);

    return doesCarExistPromise.then((doesCarExist) => {
      if (status === 'available') {
        return { code: 400, error: 'You are only allowed to update Car status as sold' };
      }

      if (status !== 'sold') {
        return { code: 400, error: 'Malformed Path' };
      }

      if (doesCarExist.code === 404) {
        return doesCarExist;// returns an object of the status and  error message
      }

      return getCarOrderProperties.then((order) => {
        if (!order) {
          return { code: 400, error: 'You cannot mark an unordered ad as sold' };
        }

        const { owner, carstatus } = order[0];
        if (Number(owner) !== userId) {
          return { code: 400, error: 'You cannot update an ad you did not create' };
        }

        if (carstatus === 'sold') {
          return { code: 400, error: 'Status is sold. Update not performed' };
        }
        const acceptedOrder = order.find(car => car.orderstatus === 'accepted');

        if (!acceptedOrder) {
          return { code: 400, error: 'You cannot mark an unaccepted ad as sold' };
        }

        const getCarPromise = CarService.markAsSoldQuery(carId);
        return getCarPromise.then(
          data => data,
        );
      });
    });
  }


  static async updateCarPriceQuery(id, newPrice) {
    const queryString = 'UPDATE cars SET price = $1 WHERE id=$2 AND deleted=false RETURNING *;';
    const value = [newPrice, id];
    const { rows } = await query(queryString, value);
    const { ...rest } = rows[0];
    return { ...rest };
  }

  static async getCarOrderProperties(id) {
    const queryString = 'SELECT cars.owner,cars.status as carstatus,orders.status as orderstatus FROM orders INNER JOIN cars ON cars.id = orders.car_id WHERE cars.id = $1  AND  deleted=false ;';
    const value = [id];
    const { rows } = await query(queryString, value);
    if (rows.length === 0) { return false; }
    return rows;
  }

  static async createCarQuery(body, userId, url) {
    const queryString = 'INSERT INTO cars (owner,state,status, price, manufacturer, model, body_type, url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *; ';
    const value = [
      userId,
      body.state,
      'available',
      body.price,
      body.manufacturer,
      body.model,
      body.body_type,
      url,
    ];
    const { rows } = await query(queryString, value);
    const { ...rest } = rows[0];

    return { ...rest };
  }


  static async getAvailableCarQuery(state) {
    let queryString = 'SELECT * FROM cars WHERE status=\'available\' AND  deleted=false ';
    let value = [];
    if (state) {
      queryString += ' AND state = $1';
      value = [state];
    }
    return CarService.customQuery(queryString, value);
  }

  static async getAllCarsQuery() {
    const queryString = 'SELECT * FROM cars WHERE deleted=false ';
    const value = [];
    return CarService.customQuery(queryString, value);
  }

  static async getSingleCarQuery(carId) {
    // let queryString = 'SELECT * FROM cars WHERE status=\'available\' AND  deleted=false  ';
    const queryString = 'SELECT * FROM cars  WHERE cars.id = $1 AND deleted=false';
    const value = [carId];
    const { rows } = await query(queryString, value);
    if (rows[0]) {
      const { ...rest } = rows[0];

      return { ...rest };
    }
    return undefined;
  }

  static async markAsSoldQuery(id) {
    const queryString = 'UPDATE cars SET status = $1 WHERE id=$2 AND  deleted=false RETURNING *;';
    const value = ['sold', id];
    const { rows } = await query(queryString, value);

    const { ...rest } = rows[0];

    return { ...rest };
  }

  static async getDeleteCarQuery(carId) {
    const queryString = 'UPDATE cars SET deleted=true WHERE cars.id = $1 AND deleted=false RETURNING id ;';
    const value = [carId];
    const { rows } = await query(queryString, value);

    if (rows[0]) {
      return 'delete';
    }
    return undefined;
  }

  static async getAllCarsByManufacturerQuery(manufacturer) {
    let queryString = 'SELECT * FROM cars WHERE status=\'available\' AND  deleted=false ';
    queryString += ' AND manufacturer = $1';
    const value = [manufacturer];
    return CarService.customQuery(queryString, value);
  }

  static async getAllUnsoldAvailableCarsByRangeQuery(range) {
    let queryString = 'SELECT * FROM cars WHERE status=\'available\' AND  deleted=false ';
    queryString += ' AND price >= $1 AND price <= $2 ;';
    const value = range;
    return CarService.customQuery(queryString, value);
  }

  static async getAllCarsByBodyTypeQuery(bodyType) {
    let queryString = 'SELECT * FROM cars WHERE status=\'available\' AND  deleted=false';
    queryString += ' AND body_type = $1';
    const value = [bodyType];
    return CarService.customQuery(queryString, value);
  }

  static async doesCarBelongToUser(carId, userId) {
    const queryString = 'SELECT cars.id FROM users INNER JOIN cars ON cars.owner = users.id WHERE owner = $1 AND users.id = $2 AND  deleted=false  LIMIT 1;';
    const value = [carId, userId];
    const { rows } = await query(queryString, value);
    if (rows.length === 1) { return true; }
    return false;
  }

  static async customQuery(queryString, value) {
    const { rows } = await query(queryString, value);
    const result = [];
    rows.forEach((row) => {
      const { ...rest } = row;

      result.push({ ...rest });
    });

    return result;
  }
}

export default CarService;
