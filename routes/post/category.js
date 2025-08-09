const router = require("express").Router();
const controllers = require("../../controllers/init");
const middleware = require("../../utils/middleware");
const constant = require("../../utils/constant");

router.post(
  "/",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([{ name: ["string"] }]),
  ],
  controllers.post_category.create
);

router.get(
  "/list",
  [middleware.checkParams([{ limit: ["int-string"], offset: ["int-string"] }])],
  controllers.post_category.list
);

router.get(
  "/detail",
  [middleware.checkParams([{ slug: ["string"] }])],
  controllers.post_category.detail
);

router.put(
  "/",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([
      { id: ["int-string", "integer"], name: ["string"] },
    ]),
  ],
  controllers.post_category.update
);

router.delete(
  "/",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([{ id: ["int-string", "integer"] }]),
  ],
  controllers.post_category.delete
);

module.exports = router;
