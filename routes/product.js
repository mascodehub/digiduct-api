const router = require("express").Router();
const controllers = require("../controllers/init");
const middleware = require("../utils/middleware");

router.get("/", controllers.product.listData);
router.post("/", controllers.product.postData);
router.put("/", controllers.product.putData);
router.delete("/", controllers.product.deleteData);

module.exports = router;
