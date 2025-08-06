const router = require("express").Router();
const controllers = require("../controllers/init");
const middleware = require("../utils/middleware");
const constant = require("../utils/constant");

router.get(
  "/",
  middleware.checkParams(["limit", "offset"]),
  controllers.product.listData
);

router.get(
  "/detail",
  middleware.checkParams(["id"]),
  controllers.product.detailData
);

router.post(
  "/",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams(["name", "description"]),
  ],
  controllers.product.createData
);

router.put(
  "/",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams(["id", "name", "description"]),
  ],
  controllers.product.updateData
);

router.delete(
  "/",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams(["id"]),
  ],
  controllers.product.deleteData
);

module.exports = router;
