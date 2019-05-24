
class Result {
  static getResult(res, car, isArrayOfOutput) {
    if (car.error) {
      return res.status(400).json({ status: 400, error: car.error });
    }
    if (car === 'delete') {
      return res.status(201).json({ status: 201, data: 'Car Ad successfully deleted' });
    }

    if (isArrayOfOutput) {
      return res.status(201).json({ status: 201, data: [...car] });
    }

    return res.status(201).json({ status: 201, data: { ...car } });
  }
}

export default Result;
