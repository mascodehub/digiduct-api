const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.list = async (params) => {
  let result = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      image_path: true,
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
  let result = await prisma.product.findFirst({
    select: {
      id: true,
      name: true,
      description: true,
      image_path: true,
    },
    where: {
      id: params.id,
      del_on: null,
    },
  });

  return result;
};

exports.create = async (params) => {
  let result = await prisma.product.create({
    data: {
      name: params.name,
      description: params.description,
      image_path: params.image_path,
      add_by: params.action_by,
      add_on: new Date(),
    },
  });

  return result;
};

exports.update = async (params) => {
  let result = await prisma.product.update({
    data: {
      name: params.name,
      description: params.description,
      image_path: params.image_path,
      edit_by: params.action_by,
      edit_on: new Date(),
    },
    where: {
      id: params.id,
    },
  });

  return result;
};

exports.delete = async (params) => {
  let result = await prisma.product.update({
    data: {
      delete_by: params.action_by,
      delete_on: new Date(),
    },
    where: {
      id: params.id,
    },
  });

  return result;
};