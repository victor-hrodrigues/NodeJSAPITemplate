import User, { create, findByEmail } from "../models/user.model";
import {
  compare as comparePassword,
  hash as hashPassword,
} from "../utils/password";
import { generate as generateToken } from "../utils/token";

export function signup(request, response) {
  const { firstname, lastname, email, password } = request.body;
  const hashedPassword = hashPassword(password.trim());

  const user = new User(
    firstname.trim(),
    lastname.trim(),
    email.trim(),
    hashedPassword
  );

  create(user, (err, data) => {
    if (err) {
      response.status(500).send({
        status: "error",
        message: err.message,
      });
    } else {
      const token = generateToken(data.id);
      response.status(201).send({
        status: "success",
        data: {
          token,
          data,
        },
      });
    }
  });
}

export function signin(request, response) {
  const { email, password } = request.body;
  findByEmail(email.trim(), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.status(404).send({
          status: "error",
          message: `User with email ${email} was not found`,
        });
        return;
      }
      response.status(500).send({
        status: "error",
        message: err.message,
      });
      return;
    }
    if (data) {
      if (comparePassword(password.trim(), data.password)) {
        const token = generateToken(data.id);
        response.status(200).send({
          status: "success",
          data: {
            token,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
          },
        });
        return;
      }
      response.status(401).send({
        status: "error",
        message: "Incorrect password",
      });
    }
  });
}
