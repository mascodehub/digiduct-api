const router = require("express").Router();
const controllers = require("../controllers/init");
const middleware = require("../utils/middleware");
const constant = require("../utils/constant");

router.post(
  "/order",
  [
    middleware.checkParams([
      { phone: ["string", "int-string"] },
      { email: ["string"] },
      { product_id: ["int-string", "integer"] },
      { package_id: ["int-string", "integer"] },
      { category_id: ["int-string", "integer"] },
    ]),
  ],
  controllers.transaction.create
);

router.get(
  "/",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([
      { limit: ["int-string", "integer"] },
      { offset: ["int-string", "integer"] },
    ]),
  ],
  controllers.transaction.list
);

router.get(
  "/detail",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([
      { uuid: ["string"] },
    ]),
  ],
  controllers.transaction.detail
);

module.exports = router;
