const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAdmin = async (req, res) => {
  let result = await prisma.admin.findFirst({
    select: {
      id: true,
      username: true,
      password: true,
    },
    where: {
      username: req.body.username,
      del_on: null,
    },
  });
  return result;
};

exports.getProfileAdmin = async (req, res) => {
  let result = await prisma.admin.findFirst({
    select: {
      username: true,
      email: true,
      phone: true,
    },
    where: {
      token: req.params.token,
      del_on: null,
    },
  });
  return result;
};

exports.updateTokenAdmin = async (params) => {
  let result = await prisma.admin.update({
    where: {
      id: params.id,
    },
    data: {
      token: params.token,
    },
  });
  return result;
};