import { sign, verify } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../utils/secrets";
import { logger } from "./logger";

const generate = (id) => sign({ id }, JWT_SECRET_KEY, { expiresIn: "1d" });

const decode = (token) => {
  try {
    return verify(token, JWT_SECRET_KEY);
  } catch (error) {
    logger.error(error);
  }
};

export default {
  generate,
  decode,
};
