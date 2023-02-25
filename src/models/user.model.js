import { query } from "../config/db.config";
import {
  createNewUser as createNewUserQuery,
  findUserByEmail as findUserByEmailQuery,
} from "../database/queries";
import { logger } from "../utils/logger";

class User {
  constructor(firstname, lastname, email, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }

  static create(newUser, callback) {
    query(
      createNewUserQuery,
      [newUser.firstname, newUser.lastname, newUser.email, newUser.password],
      (err, res) => {
        if (err) {
          logger.error(err.message);
          callback(err, null);
          return;
        }
        callback(null, {
          id: res.insertId,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          email: newUser.email,
        });
      }
    );
  }

  static findByEmail(email, callback) {
    query(findUserByEmailQuery, email, (err, res) => {
      if (err) {
        logger.error(err.message);
        callback(err, null);
        return;
      }
      if (res.length) {
        callback(null, res[0]);
        return;
      }
      callback({ kind: "not_found" }, null);
    });
  }
}

export default User;
