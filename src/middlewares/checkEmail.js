import { findByEmail } from "../models/user.model";

const checkEmail = (req, res, next) => {
  const { email } = req.body;
  findByEmail(email, (_, data) => {
    if (data) {
      res.status(400).send({
        status: "error",
        message: `A user with email address '${email}' already exits`,
      });
      return;
    }
    next();
  });
};

export default checkEmail;
