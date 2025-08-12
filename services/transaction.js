const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();

exports.create = async (params) => {
  let uuidOrder = uuidv4();

  let result = await prisma.product_transactions.create({
    data: {
      uuid: uuidOrder,
      user_id: params.user_id,
      product_id: params.product_id,
      product_name: params.product_name,
      product_description: params.product_description,
      package_id: params.package_id,
      package_name: params.package_name,
      package_period: params.package_period,
      package_price: params.package_price,
      category_id: params.category_id,
      category_name: params.category_name,
      status: params.status,
      add_by: params.phone,
      add_on: new Date(),
    },
  });

  return result;
};

exports.list = async (params) => {
  let result = await prisma.product_transactions.findMany({
    where: {
      del_on: null,
    },
    take: params.limit,
    skip: params.offset,
    orderBy: { add_on: "desc" },
  });

  return result;
};

exports.detail = async (params) => {
  let result = await prisma.product_transactions.findFirst({
    where: {
      uuid: params.uuid,
      del_on: null,
    },
  });

  return result;
};