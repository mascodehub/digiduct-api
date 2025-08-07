const generalResp = require("../utils/httpResp");
const file = require("../services/file");
const { uploadFile } = require("../utils/file");
const { convertByType, detectType } = require("../utils/datatype");

exports.uploadProduct = async (req, res, next) => {
  let response;
  try {
    let upload = await uploadFile(req.file.buffer);

    if (!upload) {
      throw {
        rc: generalResp.HTTP_BADREQUEST,
        rd: "Failed Upload!",
      };
    }

    let params = {
      id: convertByType(detectType(req.body.product_id), req.body.product_id),
      image_path: upload.optimized,
    };

    let result = await file.updateProduct(params);

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
