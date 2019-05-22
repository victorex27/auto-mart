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
    ];
    this.lastInsertId = this.cars.length;
  }

  doesCarExist(id) {
    return this.cars.find(car => car.id === id);
  }

  doesCarBelongToBuyer(id, userId) {
    return this.cars.find(car => car.id === id && car.owner === userId);
  }
}
export default new Car();
