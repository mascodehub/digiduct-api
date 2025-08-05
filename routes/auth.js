const router = require("express").Router();
const controllers = require("../controllers/init");
const middleware = require("../utils/middleware");

router.post("/", controllers.auth.login);

module.exports = router;
