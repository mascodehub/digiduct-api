const router = require("express").Router();
const controllers = require("../controllers/init");
const middleware = require("../utils/middleware");
const constant = require("../utils/constant");

router.get(
  "/",
  middleware.checkParams([
    { limit: ["int-string", "integer"] },
    { offset: ["int-string", "integer"] },
  ]),
  controllers.category.listData
);

router.get(
  "/detail",
  middleware.checkParams([{ id: ["int-string", "integer"] }]),
  controllers.category.detailData
);

router.post(
  "/",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([{ name: ["string"] }]),
  ],
  controllers.category.createData
);

router.put(
  "/",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([
      { id: ["int-string", "integer"] },
      { name: ["string"] },
    ]),
  ],
  controllers.category.updateData
);

router.delete(
  "/",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([{ id: ["int-string", "integer"] }]),
  ],
  controllers.category.deleteData
);

module.exports = router;
