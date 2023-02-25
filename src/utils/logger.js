import "dotenv/config";
import { createWriteStream } from "fs";
import { join } from "path";
import {
  addColors,
  createLogger,
  format as _format,
  transports as _transports,
} from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "orange",
};

addColors(colors);

const transports = [
  new _transports.File({
    filename: "logs/errors.log",
    level: "error",
  }),
  new _transports.File({
    filename: "logs/combined.log",
  }),
];

const logger = createLogger({
  level: "info",
  levels,
  format: _format.json(),
  transports,
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new _transports.Console({
      format: _format.combine(_format.colorize(), _format.simple()),
    })
  );
}

const httpLogStream = createWriteStream(
  join(__dirname, "../../", "logs", "http_logs.log")
);

export default {
  httpLogStream,
  logger,
};
