const router = require("express").Router();
const controllers = require("../controllers/init");
const middleware = require("../utils/middleware");
const constant = require("../utils/constant");
const { uploadFileLocal } = require("../utils/file");

const upload = uploadFileLocal();

router.post(
  "/upload/product",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([{ product_id: ["int-string", "integer"] }]),
  ],
  upload.single("file"),
  controllers.file.uploadProduct
);

router.post(
  "/upload/prove",
  [
    middleware.checkGrants(constant.GRANTS_ROLE),
    middleware.checkParams([{ uuid: ["string"] }]),
  ],
  upload.single("file"),
  controllers.file.uploadProve
);

module.exports = router;
