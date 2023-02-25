import { object, string } from "joi";
import validatorHandler from "../middlewares/validatorHandler";

const signup = (req, res, next) => {
  const schema = object().keys({
    firstname: string().trim().alphanum().min(3).max(50).required(),
    lastname: string().trim().alphanum().min(3).max(50).required(),
    email: string().trim().email().required(),
    password: string()
      .trim()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .required(),
  });
  validatorHandler(req, res, next, schema);
};

const signin = (req, res, next) => {
  const schema = object().keys({
    email: string().trim().email().required(),
    password: string()
      .trim()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .required(),
  });
  validatorHandler(req, res, next, schema);
};

export default {
  signup,
  signin,
};
