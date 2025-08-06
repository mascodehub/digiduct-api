const router = require("express").Router();
const controllers = require("../controllers/init");
const middleware = require("../utils/middleware");
const constant = require("../utils/constant");
const { uploadFileLocal } = require("../utils/file");

const upload = uploadFileLocal();

router.get("/", middleware.checkParams(["file"]), controllers.file.upload);

router.post(
  "/upload",
  [middleware.checkGrants(constant.GRANTS_ROLE), middleware.checkParams([])],
  upload.single("file"),
  controllers.file.upload
);

module.exports = router;
