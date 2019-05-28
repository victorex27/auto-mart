import flagData from './data/flag';
import Car from './car';

class Flag {
  constructor() {
    this.flags = flagData;
    this.lastInsertId = this.flags.length;
  }


  createFlag(userId, body) {
    const { carId } = body;
    if (!this.getCars().doesCarExist(carId)) {
      return { error: 'Car id does not exist' };
    }

    if (this.getCars().belongsToOwner(userId, carId)) {
      return { error: 'You cannot report your own ad' };
    }
    const newFlag = {
      id: this.lastInsertId + 1,
      user: userId,
      carId,
      reason: body.reason,
      description: body.description,
      createdOn: Date.now(),
    };
    this.lastInsertId = this.lastInsertId + 1;

    this.flags.push(newFlag);

    return newFlag;
  }

  getCars() {
    if (!this.cars) this.cars = Car;
    return this.cars;
  }
}
export default new Flag();
