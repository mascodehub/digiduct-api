const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.findAll = async (req, res) => {
    let result = await prisma.product.findMany({});
    
    return result;
};
