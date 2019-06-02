
class Result {
  static getResult(res, obj, isArrayOfOutput, status) {
    if (obj.error) {
      return res.status(obj.code).json({ status: obj.code, error: obj.error });
    }
    if (obj === 'delete') {
      return res.status(status).json({ status, data: 'Car Ad successfully deleted' });
    }

    if (isArrayOfOutput) {
      return res.status(status).json({ status, data: [...obj] });
    }
    return res.status(status).json({ status, data: { ...obj } });
  }
}

export default Result;
