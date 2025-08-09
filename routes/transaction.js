const router = require("express").Router();
const controllers = require("../controllers/init");
const middleware = require("../utils/middleware");
const constant = require("../utils/constant");

router.post(
  "/order",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
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

module.exports = router;
