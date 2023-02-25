import { createConnection } from "mysql";
import { logger } from "../utils/logger";
import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } from "../utils/secrets";

const connection = createConnection({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
});

connection.connect((err) => {
  if (err) logger.error(err.message);
  else logger.info("Database connected");
});

export default connection;
