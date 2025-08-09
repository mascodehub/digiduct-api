const generalResp = require("../../utils/httpResp");
const { convertByType } = require("../../utils/datatype");
const { slugify } = require("../../utils/global");
const article = require("../../services/post/article");

exports.create = async (req, res, next) => {
  let response, params, result;
  try {
    await prisma.$transaction(async (tx) => {
      params = {
        title: convertByType(req.body.title),
        slug: slugify(convertByType(req.body.title)),
        content: convertByType(req.body.content),
        thumbnail: convertByType(req.body.thumbnail),
        status: convertByType(req.body.status),
        category_id: convertByType(req.body.category_id),
        meta_title: convertByType(req.body.meta_title),
        meta_description: convertByType(req.body.meta_description),
        meta_keywords: convertByType(req.body.meta_keywords),
        og_title: convertByType(req.body.og_title),
        og_description: convertByType(req.body.og_description),
        og_image: convertByType(req.body.og_image),
        author_username: req.username,
      };

      result = await article.create(params);

      let article_id = result.id;

      params = params.tag.map((item) => ({
        name: item.name,
        slug: slugify(convertByType(item.name)),
        add_on: new Date(),
      }));
      await article.tagCreateMany(params);

      params = params.map((item) => item.slug);
      result = await article.tagList(params);

      params = result.map((item) => ({
        article_id: article_id,
        tag_id: item.id,
      }));
      await article.articleTagCreateMany(params);
    });

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

exports.list = async (req, res, next) => {
  let response, params, result;
  try {
    params = {
      limit: convertByType(req.query.limit),
      offset: convertByType(req.query.offset),
    };

    result = await article.list(params);

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

    result = await article.detail(params);

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

    result = await article.update(params);

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

    result = await article.delete(params);

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
