import FlagModel from '../models/flag';
import Result from '../helpers/result';
import Validator from '../helpers/validator';


class Flag {
  static postFlag(req, res) {
    const error = Validator.validate(req, res);
    if (error) return error;
    return Result.getResult(res, FlagModel.createFlag(req.user.id, req.body), false);
  }
}

export default Flag;
