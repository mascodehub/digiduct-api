const generalResp = require("../../utils/httpResp");
const { convertByType } = require("../../utils/datatype");
const { slugify } = require("../../utils/global");
const category = require("../../services/post/category");

exports.create = async (req, res, next) => {
  let response, params, result;
  try {
    params = {
      name: convertByType(req.body.name),
      slug: slugify(convertByType(req.body.name)),
    };

    result = await category.create(params);

    response = {
      rc: generalResp.HTTP_OK,
      rd: "OK",
      data: result,
    };
    res.locals.response = JSON.stringify(response);
  } catch (error) {
    console.error(error);

    response = {
      rc: error.rc || 500,
      rd: error.rd || "Some error occurred while retrieving data.",
      data: null,
    };

    res.locals.status = error.rc || 500;
    res.locals.response = JSON.stringify(response);
  }

  next();
};

exports.list = async (req, res, next) => {
  let response, params, result;
  try {
    params = {
      limit: convertByType(req.query.limit),
      offset: convertByType(req.query.offset),
    };

    result = await category.list(params);

    response = {
      rc: generalResp.HTTP_OK,
      rd: "OK",
      data: result,
    };
    res.locals.response = JSON.stringify(response);
  } catch (error) {
    console.error(error);

    response = {
      rc: error.rc || 500,
      rd: error.rd || "Some error occurred while retrieving data.",
      data: null,
    };

    res.locals.status = error.rc || 500;
    res.locals.response = JSON.stringify(response);
  }

  next();
};

exports.detail = async (req, res, next) => {
  let response, params, result;
  try {
    params = {
      slug: convertByType(req.query.slug),
    };

    result = await category.detail(params);

    response = {
      rc: generalResp.HTTP_OK,
      rd: "OK",
      data: result,
    };
    res.locals.response = JSON.stringify(response);
  } catch (error) {
    console.error(error);

    response = {
      rc: error.rc || 500,
      rd: error.rd || "Some error occurred while retrieving data.",
      data: null,
    };

    res.locals.status = error.rc || 500;
    res.locals.response = JSON.stringify(response);
  }

  next();
};

exports.update = async (req, res, next) => {
  let response, params, result;
  try {
    params = {
      id: convertByType(req.body.id),
      name: convertByType(req.body.name),
      slug: slugify(convertByType(req.body.name)),
    };

    result = await category.update(params);

    response = {
      rc: generalResp.HTTP_OK,
      rd: "OK",
      data: result,
    };
    res.locals.response = JSON.stringify(response);
  } catch (error) {
    console.error(error);

    response = {
      rc: error.rc || 500,
      rd: error.rd || "Some error occurred while retrieving data.",
      data: null,
    };

    res.locals.status = error.rc || 500;
    res.locals.response = JSON.stringify(response);
  }

  next();
};

exports.delete = async (req, res, next) => {
  let response, params, result;
  try {
    params = {
      id: convertByType(req.body.id),
    };

    result = await category.delete(params);

    response = {
      rc: generalResp.HTTP_OK,
      rd: "OK",
      data: result,
    };
    res.locals.response = JSON.stringify(response);
  } catch (error) {
    console.error(error);

    response = {
      rc: error.rc || 500,
      rd: error.rd || "Some error occurred while retrieving data.",
      data: null,
    };

    res.locals.status = error.rc || 500;
    res.locals.response = JSON.stringify(response);
  }

  next();
};
