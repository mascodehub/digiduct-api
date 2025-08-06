const router = require("express").Router();
const controllers = require("../controllers/init");
const middleware = require("../utils/middleware");
const constant = require("../utils/constant");

router.get(
  "/",
  middleware.checkParams(["limit", "offset"]),
  controllers.category.listData
);

router.get(
  "/detail",
  middleware.checkParams(["id"]),
  controllers.category.detailData
);

router.post(
  "/",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams(["name"]),
  ],
  controllers.category.createData
);

router.put(
  "/",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams(["id", "name"]),
  ],
  controllers.category.updateData
);

router.delete(
  "/",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams(["id"]),
  ],
  controllers.category.deleteData
);

module.exports = router;
