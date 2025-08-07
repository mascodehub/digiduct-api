// const logger = require("../utils/logger");
const generalResp = require("../utils/httpResp");
const category = require("../services/category");
const { convertByType, detectType } = require("../utils/datatype");

exports.listData = async (req, res, next) => {
  let response;

  try {
    let params = {
      limit: convertByType(detectType(req.query.limit), req.query.limit),
      offset: convertByType(detectType(req.query.offset), req.query.offset),
    };
    
    let result = await category.list(params);

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
      id: convertByType(detectType(req.query.id), req.query.id),
    };

    let result = await category.detail(params);

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
      name: convertByType(detectType(req.body.name), req.body.name),
      description: convertByType(detectType(req.body.description), req.body.description),
      action_by: req.username, 
    };

    let result = await category.create(params);

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
      id: convertByType(detectType(req.body.id), req.body.id),
      name: convertByType(detectType(req.body.name), req.body.name),
      description: convertByType(detectType(req.body.description), req.body.description),
      action_by: req.username,
    };

    let result = await category.update(params);

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
      id: convertByType(detectType(req.body.id), req.body.id),
      action_by: req.username,
    };
    
    let result = await category.delete(params);

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
