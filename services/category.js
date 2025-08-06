const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.list = async (params) => {
  let result = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
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
  let result = await prisma.category.findFirst({
    select: {
      id: true,
      name: true,
    },
    where: {
      id: params.id,
      del_on: null,
    },
  });

  return result;
};

exports.create = async (params) => {
  let result = await prisma.category.create({
    data: {
      name: params.name,
      add_by: params.action_by,
      add_on: new Date(),
    },
  });

  return result;
};

exports.update = async (params) => {
  let result = await prisma.category.update({
    data: {
      name: params.name,
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
  let result = await prisma.category.update({
    data: {
      del_by: params.action_by,
      del_on: new Date(),
    },
    where: {
      id: params.id,
    },
  });

  return result;
};