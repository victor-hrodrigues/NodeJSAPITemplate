import "dotenv/config";

import { logger } from "./logger";

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, JWT_SECRET_KEY } =
  process.env;

const requiredCredentials = [
  "DB_HOST",
  "DB_USERNAME",
  "DB_PASSWORD",
  "DB_NAME",
  "JWT_SECRET_KEY",
];

for (const credential of requiredCredentials) {
  if (process.env[credential] === undefined) {
    logger.error(`Could not find crendential: ${credential}`);
    process.exit(1);
  }
}

export default {
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  JWT_SECRET_KEY,
};
