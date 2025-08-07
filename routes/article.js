const router = require("express").Router();
const controllers = require("../controllers/init");
const middleware = require("../utils/middleware");
const constant = require("../utils/constant");

router.post(
  "/category",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([{ name: ["string"] }]),
  ],
  controllers.article.categoryCreate
);

module.exports = router;
