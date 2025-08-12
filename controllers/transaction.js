const generalResp = require("../utils/httpResp");
const { convertByType } = require("../utils/datatype");
const { slugify, rupiah } = require("../utils/global");
const { sendMail } = require("../utils/mail");
const transaction = require("../services/transaction");
const product = require("../services/product");
const category = require("../services/category");
const user = require("../services/user");
const { dateFormat } = require("../utils/datetime");

exports.create = async (req, res, next) => {
  let response,
    params = {},
    result,
    paramsRollback = {};
  try {
    params = {
      phone: req.body.phone.toString(),
      email: req.body.email ? convertByType(req.body.email) : "",
      product_id: convertByType(req.body.product_id),
      package_id: convertByType(req.body.package_id),
      category_id: convertByType(req.body.category_id),
      status: "PENDING",
    };

    let detailUser = await user.detailInsert({
      phone: params.phone,
      email: params.email,
    });

    params.user_id = detailUser.id;

    let detailProduct = await product.detail({ id: params.product_id });
    params.product_name = detailProduct.name;
    params.product_description = detailProduct.description;

    let detailPackage = await product.packageDetail({ id: params.package_id });
    params.package_name = detailPackage.name;
    params.package_period = detailPackage.period;
    params.package_price = detailPackage.price;

    let detailCategory = await category.detail({ id: params.category_id });
    params.category_name = detailCategory.name;

    result = await transaction.create(params);

    let paramOrder = {
      order_uuid: result.uuid,
      customer_phone: detailUser.phone,
      product_name: detailProduct.name,
      product_package: detailPackage.name,
      total_price: rupiah(detailPackage.price),
      order_date: dateFormat(result.add_on),
    };

    const mailParams = {
      to: "walidshr8@gmail.com",
      subject: `Order Baru #${result.uuid} dari ${detailUser.phone}`,
      template: "orderProcess",
      context: paramOrder,
    };

    sendMail(mailParams);

    response = {
      rc: generalResp.HTTP_OK,
      rd: "OK",
      data: { uuid_order: result.uuid },
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
  let response;

  try {
    let params = {
      limit: convertByType(req.query.limit),
      offset: convertByType(req.query.offset),
    };

    let result = await transaction.list(params);

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
      uuid: convertByType(req.query.uuid),
    };

    let result = await transaction.detail(params);

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

exports.process = async (req, res, next) => {
  let response,
    params = {},
    result,
    paramsRollback = {};
  try {
    params = {
      uuid: convertByType(req.body.uuid),
      status: convertByType(req.body.status),
    };

    result = await transaction.process(params);

    response = {
      rc: generalResp.HTTP_OK,
      rd: "OK",
      data: { uuid_order: result.uuid },
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

exports.review = async (req, res, next) => {
  let response,
    params = {},
    result,
    paramsRollback = {};
  try {
    params = {
      uuid: convertByType(req.body.uuid),
      rating: convertByType(req.body.rating),
      review: convertByType(req.body.review),
    };

    result = await transaction.review(params);

    response = {
      rc: generalResp.HTTP_OK,
      rd: "OK",
      data: { uuid_order: result.uuid },
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