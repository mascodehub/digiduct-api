const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.login = async (req, res) => {
    let result = await prisma.admin.findFirst({
      where:{
        email : req.body.email
      }
    });
    return result;
};
