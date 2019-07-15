import FlagService from '../../services/controller/v1/flag';
import Result from '../../helpers/result';
import Validator from '../../helpers/validator';


class Flag {
  static async postFlag(req, res) {
    const error = Validator.validate(req, res, 400);
    if (error) return error;

    const flagObject = await FlagService.createFlag(req.user.id, req.body);

    const result = Promise.resolve(flagObject);

    return result.then(
      flag => Result.getResult(res, flag, false, 201),
    );
  }
}

export default Flag;
