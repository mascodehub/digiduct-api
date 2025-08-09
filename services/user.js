const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.detailInsert = async (params) => {
  let result = await prisma.user.findFirst({
    select: {
      id: true,
      phone: true,
      email: true,
    },
    where: {
      phone: params.phone,
    },
  });

  if (!result) {
    result = await prisma.user.create({
      data: {
        phone: params.phone,
        email: params.email,
        add_by: params.phone,
        add_on: new Date(),
      },
    });
  }

  return result;
};
