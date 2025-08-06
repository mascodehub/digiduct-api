const router = require("express").Router();
const controllers = require("../controllers/init");
const middleware = require("../utils/middleware");
const constant = require("../utils/constant");

router.get(
  "/profile",
  [middleware.checkGrants(constant.GRANTS_ROLE), middleware.checkParams([])],
  controllers.auth.profile
);
router.post(
  "/",
  middleware.checkParams(["username", "password"]),
  controllers.auth.login
);

module.exports = router;
