const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.create = async (params) => {
  let result = await prisma.post_article.create({
    data: {
      title: params.title,
      slug: params.slug,
      content: params.content,
      thumbnail: params.thumbnail,
      status: params.status,
      published_on: params.published_on,
      author_username: params.author_username,
      category_id: params.category_id,
      meta_title: params.meta_title,
      meta_description: params.meta_description,
      meta_keywords: params.meta_keywords,
      og_title: params.og_title,
      og_description: params.og_description,
      og_image: params.og_image,
      slug: params.slug,
      add_on: new Date(),
    },
  });

  return result;
};

exports.list = async (params) => {
  let result = await prisma.post_article.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
    },
    where: {
      del_on: null,
    },
    take: params.limit,
    skip: params.offset,
    orderBy: { name: "asc" },
  });

  return result;
};

exports.detail = async (params) => {
  let result = await prisma.post_article.findFirst({
    select: {
      id: true,
      name: true,
      slug: true,
    },
    where: {
      slug: params.slug,
      del_on: null,
    },
  });

  return result;
};

exports.update = async (params) => {
  result = await prisma.post_article.update({
    data: {
      title: params.title,
      slug: params.slug,
      content: params.content,
      thumbnail: params.thumbnail,
      status: params.status,
      published_on: params.published_on,
      author_id: params.author_id,
      category_id: params.category_id,
      meta_title: params.meta_title,
      meta_description: params.meta_description,
      meta_keywords: params.meta_keywords,
      og_title: params.og_title,
      og_description: params.og_description,
      og_image: params.og_image,
      slug: params.slug,
      edit_on: new Date(),
    },
    where: {
      id: params.id,
    },
  });

  return result;
};

exports.delete = async (params) => {
  let result = false;

  let used = await prisma.post_article.findFirst({
    where: {
      category_id: params.id,
    },
  });

  if (!used) {
    result = await prisma.post_article.update({
      data: {
        del_on: new Date(),
      },
      where: {
        id: params.id,
      },
    });
  }

  return result;
};

exports.tagCreateMany = async (params) => {
  let result = await prisma.post_tag.createMany({
    data: params,
    skipDuplicates: true,
  });

  return result;
};

exports.tagList = async (params) => {
  let result = await prisma.post_tag.findMany({
    select: {
      id: true,
    },
    where: {
      slug: {
        in: params.slug,
      },
    },
  });

  return result;
};

exports.articleTagCreateMany = async (params) => {
   let result = await prisma.post_article_tag.createMany({
     data: params,
     skipDuplicates: true,
   });
 
   return result;
 };