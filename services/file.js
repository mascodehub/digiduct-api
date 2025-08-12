const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.updateProduct = async (params) => {
  let result = await prisma.product.update({
    data: {
      image_path: params.image_path,
    },
    where: {
      id: params.id,
    },
  });

  return result;
};

exports.updateTransaction = async (params) => {
  let result = await prisma.product_transactions.update({
    data: {
      prove_path: params.prove_path,
      edit_on: new Date(),
    },
    where: {
      uuid: params.uuid,
    },
  });

  return result;
};
