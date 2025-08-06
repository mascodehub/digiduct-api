// const logger = require("../utils/logger");
const generalResp = require("../utils/httpResp");
const product = require("../services/product");

exports.listData = async (req, res, next) => {
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

exports.detailData = async (req, res, next) => {
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

exports.createData = async (req, res, next) => {
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

exports.updateData = async (req, res, next) => {
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

exports.deleteData = async (req, res, next) => {
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
