// const logger = require("../utils/logger");
const constant = require("../utils/constant");
const middleware = require("../utils/middleware");
const routes = require("../routes/init");

const cors = require("cors");
const express = require("express");

const app = express();

// logger.verbose("=========KICK START=========");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/auth",
  routes.auth,
  middleware.recordHit,
  middleware.printForwardRequestResponse
);

app.use(
  "/file",
  routes.file,
  middleware.recordHit,
  middleware.printForwardRequestResponse
);

app.use(
  "/product",
  routes.product,
  middleware.recordHit,
  middleware.printForwardRequestResponse
);

app.use(
  "/category",
  routes.category,
  middleware.recordHit,
  middleware.printForwardRequestResponse
);

app.use(
  "/post/category",
  routes.post_category,
  middleware.recordHit,
  middleware.printForwardRequestResponse
);

app.use(
  "/post/tag",
  routes.post_tag,
  middleware.recordHit,
  middleware.printForwardRequestResponse
);

app.use(
  "/post/article",
  routes.post_article,
  middleware.recordHit,
  middleware.printForwardRequestResponse
);

module.exports = (req, res) => {
  app(req, res);
};

const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   // logger.verbose(`Listening at ${host}:${port}`);
//   // logger.verbose("=========KICK END=========");
// });
