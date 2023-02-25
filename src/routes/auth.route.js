const router = require("express").Router();
import { signin, signup } from "../controllers/auth.controller";
import { asyncHandler } from "../middlewares/asyncHandler";
import checkEmail from "../middlewares/checkEmail";
import {
  signin as signinValidator,
  signup as signupValidator,
} from "../validators/auth";

router
  .route("/signup")
  .post(signupValidator, asyncHandler(checkEmail), asyncHandler(signup));

router.route("/signin").post(signinValidator, asyncHandler(signin));

export default router;
