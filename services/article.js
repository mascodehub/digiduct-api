const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.create = async (params) => {
  let result = await prisma.article.create({
    data: {
      title: params.title,
      slug: params.slug,
      content: params.content,
      thumbnail: params.thumbnail,
      status: params.status,
      category_id: params.category_id,
      meta_title: params.meta_title,
      meta_description: params.meta_description,
      meta_keywords: params.meta_keywords,
      og_title: params.og_title,
      og_description: params.og_description,
      og_image: params.og_image,
      author_id: params.action_by,
      add_on: new Date(),
    },
  });

  return result;
};

exports.update = async (params) => {
  let result = await prisma.article.update({
    where: {
      id: params.id,
    },
    data: {
      title: params.title,
      slug: params.slug,
      content: params.content,
      thumbnail: params.thumbnail,
      status: params.status,
      category_id: params.category_id,
      meta_title: params.meta_title,
      meta_description: params.meta_description,
      meta_keywords: params.meta_keywords,
      og_title: params.og_title,
      og_description: params.og_description,
      og_image: params.og_image,
      author_id: req.username,
      edit_on: new Date(),
    },
  });

  return result;
};

exports.update = async (params) => {
  let result = await prisma.article.update({
    where: {
      id: params.id,
    },
    data: {
      del_on: new Date(),
    },
  });

  return result;
};

exports.categoryCreate = async (params) => {
  let result = await prisma.article_category.create({
    data: {
      name: params.name,
      slug: params.slug,
      add_on: new Date(),
    },
  });

  return result;
};
