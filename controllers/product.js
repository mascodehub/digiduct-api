// const logger = require("../utils/logger");
const generalResp = require("../utils/httpResp");
const { convertByType, detectType } = require("../utils/datatype");
const { convertMetaphone } = require("../utils/metaphone");
const product = require("../services/product");

exports.list = async (req, res, next) => {
  let response;

  try {
    let params = {
      limit: convertByType(req.query.limit),
      offset: convertByType(req.query.offset),
    };

    let result = await product.list(params);

    response = {
      rc: generalResp.HTTP_OK,
      rd: "SUCCESS",
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

exports.listUser = async (req, res, next) => {
  let response;

  try {
    let params = {
      limit: convertByType(req.query.limit),
      offset: convertByType(req.query.offset),
    };

    let result = await product.listUser(params);

    response = {
      rc: generalResp.HTTP_OK,
      rd: "SUCCESS",
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
  let response;

  try {
    let params = {
      id: convertByType(req.query.id),
    };

    let result = await product.detail(params);

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

exports.create = async (req, res, next) => {
  let response;
  try {
    let params = {
      name: convertByType(req.body.name),
      description: convertByType(req.body.description),
      feature: convertByType(req.body.feature),
      metaphone: convertMetaphone(convertByType(req.body.name)),
      action_by: req.username,
    };

    let result = await product.create(params);

    if (!result) {
      throw {
        rc: generalResp.HTTP_BADREQUEST,
        rd: "DUPLICATE DATA",
      };
    }

    params = (params.feature).map((item) => ({
      product_id: result.id,
      name: item,
    }));

    await product.featureCreate(params);

    response = {
      rc: generalResp.HTTP_OK,
      rd: "OK",
      data: result,
    };
    res.locals.response = JSON.stringify(response);
  } catch (error) {
    console.log(error);

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
  let response;
  try {
    let params = {
      id: convertByType(req.body.id),
      name: convertByType(req.body.name),
      description: convertByType(req.body.description),
      feature: convertByType(req.body.feature),
      metaphone: convertMetaphone(convertByType(req.body.name)),
      action_by: req.username,
    };

    let result = await product.update(params);

    if (!result) {
      throw {
        rc: generalResp.HTTP_BADREQUEST,
        rd: "DUPLICATE DATA",
      };
    }

    params = (params.feature).map((item) => ({
      product_id: params.id,
      name: item,
    }));

    await product.featureCreate(params);

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
      data: null,
    };

    res.locals.status = error.rc || 500;
    res.locals.response = JSON.stringify(response);
  }

  next();
};

exports.delete = async (req, res, next) => {
  let response;
  try {
    let params = {
      id: convertByType(req.body.id),
      action_by: req.username,
    };

    let result = await product.delete(params);

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
      data: null,
    };

    res.locals.status = error.rc || 500;
    res.locals.response = JSON.stringify(response);
  }

  next();
};

exports.packageList = async (req, res, next) => {
  let response;

  try {
    let params = {
      product_id: convertByType(req.query.product_id),
      limit: convertByType(req.query.limit),
      offset: convertByType(req.query.offset),
    };

    let result = await product.packageList(params);

    response = {
      rc: generalResp.HTTP_OK,
      rd: "SUCCESS",
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

exports.packageDetail = async (req, res, next) => {
  let response;

  try {
    let params = {
      id: convertByType(req.query.id),
    };

    let result = await product.packageDetail(params);

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

exports.packageCreate = async (req, res, next) => {
  let response;
  try {
    let params = {
      product_id: convertByType(req.body.product_id),
      name: convertByType(req.body.name),
      period: convertByType(req.body.period),
      price: convertByType(req.body.price),
      stock: convertByType(req.body.stock),
      status: convertByType(req.body.status),
      action_by: req.username,
    };

    let result = await product.packageCreate(params);

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

exports.packageUpdate = async (req, res, next) => {
  let response;
  try {
    let params = {
      id: convertByType(req.body.id),
      name: convertByType(req.body.name),
      period: convertByType(req.body.period),
      price: convertByType(req.body.price),
      stock: convertByType(req.body.stock),
      status: convertByType(req.body.status),
      action_by: req.username,
    };

    let result = await product.packageUpdate(params);

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

exports.packageDelete = async (req, res, next) => {
  let response;
  try {
    let params = {
      id: convertByType(req.body.id),
      action_by: req.username,
    };

    let result = await product.packageDelete(params);

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
      data: null,
    };

    res.locals.status = error.rc || 500;
    res.locals.response = JSON.stringify(response);
  }

  next();
};

exports.categoryList = async (req, res, next) => {
  let response;

  try {
    let params = {
      limit: convertByType(req.query.limit),
      offset: convertByType(req.query.offset),
    };

    let result = await product.categoryList(params);

    result = result.map((item) => ({
      category_id: item.category_id,
      category_name: item.category.name,
      product_id: item.product_id,
      product_name: item.product.name,
    }));

    response = {
      rc: generalResp.HTTP_OK,
      rd: "SUCCESS",
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

exports.categoryDetail = async (req, res, next) => {
  let response;

  try {
    let params = {
      category_id: convertByType(req.query.category_id),
      limit: convertByType(req.query.limit),
      offset: convertByType(req.query.offset),
    };

    let result = await product.categoryDetail(params);

    result = result.map((item) => ({
      category_id: item.category_id,
      category_name: item.category.name,
      product_id: item.product_id,
      product_name: item.product.name,
    }));

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

exports.categoryCreate = async (req, res, next) => {
  let response;
  try {
    let params = {
      product_id: convertByType(req.body.product_id),
      category_id: convertByType(req.body.category_id),
      action_by: req.username,
    };

    await product.categoryCreate(params);

    response = {
      rc: generalResp.HTTP_OK,
      rd: "OK",
      data: "",
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

exports.categoryDelete = async (req, res, next) => {
  let response;
  try {
    let params = {
      product_id: convertByType(req.body.product_id),
      category_id: convertByType(req.body.category_id),
      action_by: req.username,
    };

    let result = await product.categoryDelete(params);

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

exports.listDetail = async (req, res, next) => {
  let response;

  try {
    let params = {
      category_id: req.query?.category_id && detectType(req.query.category_id) == "int-string" ? convertByType(req.query.category_id) : null,
      product_metaphone: req.query?.product_name && detectType(req.query.product_name) == "string" ? convertMetaphone(convertByType(req.query.product_name)) : null,
      limit: convertByType(req.query.limit),
      offset: convertByType(req.query.offset),
    };

    let result = await product.listDetail(params);

    response = {
      rc: generalResp.HTTP_OK,
      rd: "SUCCESS",
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
