const auth = require("./auth");
const product = require("./product");
const category = require("./category");
const file = require("./file");
const article = require("./article");

const post_article = require("./post/article");
const post_category = require("./post/category");
const post_tag = require("./post/tag");

module.exports = {
  auth,
  product,
  category,
  file,
  article,
  post_article,
  post_category,
  post_tag,
};
