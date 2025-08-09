const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.create = async (params) => {
  let result = await prisma.post_category.upsert({
    create: {
      name: params.name,
      slug: params.slug,
      add_on: new Date(),
    },
    update: {
      name: params.name,
      slug: params.slug,
      edit_on: new Date(),
      del_on: null,
    },
    where: {
      name: params.name,
      slug: params.slug,
    },
  });

  return result;
};

exports.list = async (params) => {
  let result = await prisma.post_category.findMany({
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
  let result = await prisma.post_category.findFirst({
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
  result = await prisma.post_category.update({
    data: {
      name: params.name,
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
    result = await prisma.post_category.update({
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
