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
  controllers.product.list
);

router.get(
  "/detail",
  middleware.checkParams([{ id: ["int-string", "integer"] }]),
  controllers.product.detail
);

router.post(
  "/",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([{ name: ["string"] }, { description: ["string"] }]),
  ],
  controllers.product.create
);

router.put(
  "/",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([{ id: ["int-string", "integer"] }, { name: ["string"] }, { description: ["string"] }]),
  ],
  controllers.product.update
);

router.delete(
  "/",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([{ id: ["int-string", "integer"] }]),
  ],
  controllers.product.delete
);

router.get(
  "/package",
  middleware.checkParams([{ product_id: ["int-string", "integer"] }]),
  controllers.product.packageList
);

router.get(
  "/package/detail",
  middleware.checkParams([{ id: ["int-string", "integer"] }]),
  controllers.product.packageDetail
);

router.post(
  "/package",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([
      { product_id: ["int-string", "integer"] },
      { name: ["string"] },
      { period: ["int-string", "integer"] },
      { price: ["int-string", "integer"] },
      { stock: ["int-string", "integer"] },
      { status: ["int-string", "integer"] },
    ]),
  ],
  controllers.product.packageCreate
);

router.put(
  "/package",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([
      { id: ["int-string", "integer"] },
      { name: ["string"] },
      { period: ["int-string", "integer"] },
      { price: ["int-string", "integer"] },
      { stock: ["int-string", "integer"] },
      { status: ["int-string", "integer"] },
    ]),
  ],
  controllers.product.packageUpdate
);

router.delete(
  "/package",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([{ id: ["int-string", "integer"] }]),
  ],
  controllers.product.packageDelete
);

router.get(
  "/category",
  middleware.checkParams([]),
  controllers.product.categoryList
);

router.get(
  "/category/detail",
  middleware.checkParams([
    { category_id: ["int-string", "integer"] },
    { limit: ["int-string", "integer"] },
    { offset: ["int-string", "integer"] },
  ]),
  controllers.product.categoryDetail
);

router.post(
  "/category",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([
      { category_id: ["int-string", "integer"] },
      { product_id: ["int-string", "integer"] },
    ]),
  ],
  controllers.product.categoryCreate
);

router.delete(
  "/category",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([
      { category_id: ["int-string", "integer"] },
      { product_id: ["int-string", "integer"] },
    ]),
  ],
  controllers.product.categoryDelete
);

router.get(
  "/list",
  middleware.checkParams([
    { limit: ["int-string", "integer"] },
    { offset: ["int-string", "integer"] },
  ]),
  controllers.product.listDetail
);

module.exports = router;
