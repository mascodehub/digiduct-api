// const logger = require("../utils/logger");
const generalResp = require("../utils/httpResp");
const { detectType, convertByType } = require("../utils/datatype");
const product = require("../services/product");

exports.list = async (req, res, next) => {
  let response;

  try {
    let params = {
      limit: convertByType(detectType(req.query.limit), req.query.limit),
      offset: convertByType(detectType(req.query.offset), req.query.offset),
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
      id: convertByType(detectType(req.query.id), req.query.id),
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
      name: convertByType(detectType(req.body.name), req.body.name),
      description: convertByType(detectType(req.body.description), req.body.description),
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
      id: convertByType(detectType(req.body.id), req.body.id),
      name: convertByType(detectType(req.body.name), req.body.name),
      description: convertByType(detectType(req.body.description), req.body.description),
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
      id: convertByType(detectType(req.body.id), req.body.id),
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
      product_id: convertByType(detectType(req.query.product_id), req.query.product_id),
      limit: convertByType(detectType(req.query.limit), req.query.limit),
      offset: convertByType(detectType(req.query.offset), req.query.offset),
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
      id: convertByType(detectType(req.query.id), req.query.id),
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
      product_id: convertByType(detectType(req.body.product_id), req.body.product_id),
      name: convertByType(detectType(req.body.name), req.body.name),
      period: convertByType(detectType(req.body.period), req.body.period),
      price: convertByType(detectType(req.body.price), req.body.price),
      stock: convertByType(detectType(req.body.stock), req.body.stock),
      status: convertByType(detectType(req.body.status), req.body.status),
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
      id: convertByType(detectType(req.body.id), req.body.id),
      name: convertByType(detectType(req.body.name), req.body.name),
      period: convertByType(detectType(req.body.period), req.body.period),
      price: convertByType(detectType(req.body.price), req.body.price),
      stock: convertByType(detectType(req.body.stock), req.body.stock),
      status: convertByType(detectType(req.body.status), req.body.status),
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
      id: convertByType(detectType(req.body.id), req.body.id),
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
      limit: convertByType(detectType(req.query.limit), req.query.limit),
      offset: convertByType(detectType(req.query.offset), req.query.offset),
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
      category_id: convertByType(detectType(req.query.category_id), req.query.category_id),
      limit: convertByType(detectType(req.query.limit), req.query.limit),
      offset: convertByType(detectType(req.query.offset), req.query.offset),
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
      product_id: convertByType(detectType(req.body.product_id), req.body.product_id),
      category_id: convertByType(detectType(req.body.category_id), req.body.category_id),
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
      product_id: convertByType(detectType(req.body.product_id), req.body.product_id),
      category_id: convertByType(detectType(req.body.category_id), req.body.category_id),
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
      result: null,
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
      category_id:
        req.query?.category_id &&
        detectType(req.query.category_id) == "int-string"
          ? convertByType(
              detectType(req.query.category_id),
              req.query.category_id
            )
          : null,
      limit: convertByType(detectType(req.query.limit), req.query.limit),
      offset: convertByType(detectType(req.query.offset), req.query.offset),
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
