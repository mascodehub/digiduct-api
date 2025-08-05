// const logger = require("../utils/logger");
const generalResp = require("../utils/httpResp");
const auth = require("../services/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res, next) => {
  let response;

  try {
    let dataAdmin = await auth.getAdmin(req, res);

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      dataAdmin.password
    );

    if (dataAdmin && passwordIsValid) {
      var jwtToken = jwt.sign({}, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      response = {
        rc: generalResp.HTTP_OK,
        rd: "OK",
        data: {
          token: jwtToken,
        },
      };
    } else {
      response = {
        rc: generalResp.HTTP_BADREQUEST,
        rd: "BAD REQUEST",
        data: "",
      };
    }

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
    // logger.error(JSON.stringify(res.locals));
  }

  next();
};
