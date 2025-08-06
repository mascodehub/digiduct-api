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