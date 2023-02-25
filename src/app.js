import cors from "cors";
import express, { json, urlencoded } from "express";
import morgan from "morgan";

import authRoute from "./routes/auth.route";

import { httpLogStream } from "./utils/logger";

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(morgan("combined", { stream: httpLogStream }));
app.use(cors());

app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.status(200).send({
    status: "success",
    data: {
      message: "API health: OK!",
    },
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    status: "error",
    message: err.message,
  });
  next();
});

export default app;
