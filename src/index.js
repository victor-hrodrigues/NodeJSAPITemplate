import { listen } from "./app";
import { logger } from "./utils/logger";

const PORT = process.env.PORT || 3000;

listen(PORT, () => {
  logger.info(`Running on PORT ${PORT}`);
});
