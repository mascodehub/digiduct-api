const router = require("express").Router();
const controllers = require("../controllers/init");
const middleware = require("../utils/middleware");
const constant = require("../utils/constant");

router.get(
  "/profile",
  middleware.checkGrants(constant.GRANTS_ROLE),
  controllers.auth.profile
);

router.post(
  "/",
  middleware.checkParams([{ username: ["string"] }, { password: ["string"] }]),
  controllers.auth.login
);

router.post(
  "/change-password",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([
      { username: ["string"] },
      { password: ["string"] },
    ]),
  ],
  controllers.auth.changePassword
);

router.post(
  "/verify",
  middleware.checkGrants(constant.GRANTS_ROLE),
  controllers.auth.verify
);

module.exports = router;
