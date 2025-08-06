// const logger = require("../utils/logger");
const generalResp = require("../utils/httpResp");
const product = require("../services/product");

exports.list = async (req, res, next) => {
  let response;

  try {
    let params = {
      limit: parseInt(req.query.limit),
      offset: parseInt(req.query.offset),
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

exports.detail = async (req, res, next) => {
  let response;

  try {
    let params = {
      id: parseInt(req.query.id),
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
      name: req.body.name,
      description: req.body.description,
      action_by: req.username,
    };

    let result = await product.create(params);

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

exports.update = async (req, res, next) => {
  let response;
  try {
    let params = {
      id: parseInt(req.body.id),
      name: req.body.name,
      description: req.body.description,
      action_by: req.username,
    };

    let result = await product.update(params);

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

exports.delete = async (req, res, next) => {
  let response;
  try {
    let params = {
      id: parseInt(req.body.id),
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
      result: null,
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
      product_id: parseInt(req.query.product_id),
      limit: parseInt(req.query.limit),
      offset: parseInt(req.query.offset),
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
      id: parseInt(req.query.id),
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
      product_id: parseInt(req.body.product_id),
      name: req.body.name,
      period: parseInt(req.body.period),
      price: parseInt(req.body.price),
      stock: parseInt(req.body.stock),
      status: parseInt(req.body.status),
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
      result: null,
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
      id: parseInt(req.body.id),
      name: req.body.name,
      period: parseInt(req.body.period),
      price: parseInt(req.body.price),
      stock: parseInt(req.body.stock),
      status: parseInt(req.body.status),
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
      result: null,
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
      id: parseInt(req.body.id),
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
      result: null,
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
      limit: parseInt(req.query.limit),
      offset: parseInt(req.query.offset),
    };

    let result = await product.categoryList(params);

    result = result.map((item) => ({
      product_id: item.product_id,
      product_name: item.product.name,
      category_id: item.category_id,
      category_name: item.category.name,
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
      id: parseInt(req.query.id),
    };

    let result = await product.categoryDetail(params);

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
      product_id: parseInt(req.body.product_id),
      name: req.body.name,
      period: parseInt(req.body.period),
      price: parseInt(req.body.price),
      stock: parseInt(req.body.stock),
      status: parseInt(req.body.status),
      action_by: req.username,
    };

    let result = await product.categoryCreate(params);

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
      result: null,
    };

    res.locals.status = error.rc || 500;
    res.locals.response = JSON.stringify(response);
  }

  next();
};

exports.categoryUpdate = async (req, res, next) => {
  let response;
  try {
    let params = {
      id: parseInt(req.body.id),
      name: req.body.name,
      period: parseInt(req.body.period),
      price: parseInt(req.body.price),
      stock: parseInt(req.body.stock),
      status: parseInt(req.body.status),
      action_by: req.username,
    };

    let result = await product.categoryUpdate(params);

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
      result: null,
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
      id: parseInt(req.body.id),
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
