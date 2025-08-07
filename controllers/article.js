const generalResp = require("../utils/httpResp");
const { convertByType } = require("../utils/datatype");
const { slugify } = require("../utils/global");
const article = require("../services/article");

exports.create = async (req, res, next) => {
  let response, params, result;
  try {
    params = {
      title: convertByType(req.body.title),
      slug: slugify(convertByType(req.body.title)),
      content: convertByType(req.body.content),
      thumbnail: convertByType(req.body.thumbnail),
      status: convertByType(req.body.status),
      category_id: convertByType(req.body.category_id),
      meta_title: convertByType(req.body.meta_title),
      meta_description: convertByType(req.body.meta_description),
      meta_keywords: convertByType(req.body.meta_keywords),
      og_title: convertByType(req.body.og_title),
      og_description: convertByType(req.body.og_description),
      og_image: convertByType(req.body.og_image),
      action_by: req.username,
    };

    result = await article.create(params);

    response = {
      rc: generalResp.HTTP_OK,
      rd: "OK",
      data: result,
    };
    res.locals.response = JSON.stringify(response);
  } catch (error) {
    response = {
      rc: error.rc || 500,
      rd: error.rd || "Some error occurred while retrieving data.",
      result: null,
    };

    res.locals.status = error.rc || 500;
    res.locals.response = JSON.stringify(response);
  }

  next();
};

exports.categoryCreate = async (req, res, next) => {
  let response, params, result;
  try {
    params = {
      name: convertByType(req.body.name),
      slug: slugify(convertByType(req.body.name)),
    };

    result = await article.categoryCreate(params);

    response = {
      rc: generalResp.HTTP_OK,
      rd: "OK",
    };
    res.locals.response = JSON.stringify(response);
  } catch (error) {
    console.error(error);
    
    response = {
      rc: error.rc || 500,
      rd: error.rd || "Some error occurred while retrieving data.",
      result: null,
    };

    res.locals.status = error.rc || 500;
    res.locals.response = JSON.stringify(response);
  }

  next();
};