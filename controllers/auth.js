const logger = require("../utils/logger");
const generalResp = require("../utils/httpResp");
const auth = require("../services/auth");

exports.login = async (req, res, next) => {
  let response;
  
  try {
    let result = await auth.login(req, res);
        
    response = {
      rc: generalResp.HTTP_OK,
      rd: "SUCCESS",
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
    logger.error(JSON.stringify(res.locals));
  }

  next();
};