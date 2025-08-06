const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAdmin = async (params) => {
  let result = await prisma.admin.findFirst({
    select: {
      id: true,
      username: true,
      password: true,
    },
    where: {
      username: params.username,
      del_on: null,
    },
  });
  return result;
};

exports.getProfileAdmin = async (params) => {
  let result = await prisma.admin.findFirst({
    select: {
      username: true,
      email: true,
      phone: true,
    },
    where: {
      token: params.token,
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

exports.changePasswordAdmin = async (params) => {
  let result = await prisma.admin.update({
    where: {
      username: params.username,
    },
    data: {
      password: params.password,
      token: 'changepassword',
    },
  });
  return result;
};