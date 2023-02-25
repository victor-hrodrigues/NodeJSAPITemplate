import { hashSync, genSaltSync, compareSync } from "bcryptjs";

const hash = (password) => hashSync(password, genSaltSync(10));

const compare = (password, hashedPassword) =>
  compareSync(password, hashedPassword);

export default {
  hash,
  compare,
};
