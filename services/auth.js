const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAdmin = async (req, res) => {
  let result = await prisma.admin.findFirst({
    select: {
      password: true,
    },
    where: {
      username: req.body.username,
    },
  });
  return result;
};
