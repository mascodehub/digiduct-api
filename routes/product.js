const router = require("express").Router();
const controllers = require("../controllers/init");
const middleware = require("../utils/middleware");
const constant = require("../utils/constant");

router.get(
  "/",
  middleware.checkParams(["limit", "offset"]),
  controllers.product.list
);

router.get(
  "/detail",
  middleware.checkParams(["id"]),
  controllers.product.detail
);

router.post(
  "/",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams(["name", "description"]),
  ],
  controllers.product.create
);

router.put(
  "/",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams(["id", "name", "description"]),
  ],
  controllers.product.update
);

router.delete(
  "/",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams(["id"]),
  ],
  controllers.product.delete
);

router.get(
  "/package",
  middleware.checkParams(["product_id"]),
  controllers.product.packageList
);

router.get(
  "/package/detail",
  middleware.checkParams(["id"]),
  controllers.product.packageDetail
);

router.post(
  "/package",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([
      "product_id",
      "name",
      "period",
      "price",
      "stock",
      "status",
    ]),
  ],
  controllers.product.packageCreate
);

router.put(
  "/package",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([
      "id",
      "name",
      "period",
      "price",
      "stock",
      "status",
    ]),
  ],
  controllers.product.packageUpdate
);

router.delete(
  "/package",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams(["id"]),
  ],
  controllers.product.packageDelete
);

module.exports = router;
