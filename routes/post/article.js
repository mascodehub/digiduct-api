const router = require("express").Router();
const controllers = require("../../controllers/init");
const middleware = require("../../utils/middleware");
const constant = require("../../utils/constant");

router.post(
  "/",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([
      { title: ["string"] },
      { content: ["string"] },
      { thumbnail: ["string"] },
      { status: ["string"] },
      { category_id: ["int-string", "integer"] },
      { meta_title: ["string"] },
      { meta_description: ["string"] },
      { meta_keywords: ["string"] },
      { og_title: ["string"] },
      { og_description: ["string"] },
      { og_image: ["string"] },
    ]),
  ],
  controllers.post_article.create
);

router.get(
  "/list",
  [middleware.checkParams([{ limit: ["int-string"], offset: ["int-string"] }])],
  controllers.post_article.list
);

router.get(
  "/detail",
  [middleware.checkParams([{ slug: ["string"] }])],
  controllers.post_article.detail
);

router.put(
  "/",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([
      { id: ["int-string", "integer"], name: ["string"] },
    ]),
  ],
  controllers.post_article.update
);

router.delete(
  "/",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([{ id: ["int-string", "integer"] }]),
  ],
  controllers.post_article.delete
);

module.exports = router;
