const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.list = async (params) => {
  let result = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      image_path: true,
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
  let result = await prisma.product.findFirst({
    select: {
      id: true,
      name: true,
      description: true,
      image_path: true,
    },
    where: {
      id: params.id,
      del_on: null,
    },
  });

  return result;
};

exports.create = async (params) => {
  let result = await prisma.product.findFirst({
    where: {
      name: params.name,
      description: params.description,
      del_on: null,
    },
  });

  if (result) return false;

  result = await prisma.product.create({
    data: {
      name: params.name,
      description: params.description,
      metaphone: params.metaphone,
      add_by: params.action_by,
      add_on: new Date(),
    },
  });

  return result;
};

exports.update = async (params) => {
  let result = await prisma.product.findFirst({
    where: {
      id: {
        not: params.id
      },
      name: params.name,
      description: params.description,
      del_on: null,
    },
  });

  if (result) return false;

  result = await prisma.product.update({
    data: {
      name: params.name,
      description: params.description,
      image_path: params.image_path,
      metaphone: params.metaphone,
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
  let result = await prisma.product.update({
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

exports.packageList = async (params) => {
  let result = await prisma.product_package.findMany({
    select: {
      id: true,
      product_id: true,
      name: true,
      period: true,
      price: true,
      stock: true,
      status: true,
    },
    where: {
      product_id: params.product_id,
      del_on: null,
    },
    take: params.limit,
    skip: params.offset,
    orderBy: { name: "asc" },
  });

  return result;
};

exports.packageDetail = async (params) => {
  let result = await prisma.product_package.findFirst({
    select: {
      id: true,
      product_id: true,
      name: true,
      period: true,
      price: true,
      stock: true,
      status: true,
    },
    where: {
      id: params.id,
      del_on: null,
    },
  });

  return result;
};

exports.packageCreate = async (params) => {
  let result = await prisma.product_package.create({
    data: {
      product_id: params.product_id,
      name: params.name,
      period: params.period,
      price: params.price,
      stock: params.stock,
      status: params.status,
      add_by: params.action_by,
      add_on: new Date(),
    },
  });

  return result;
};

exports.packageUpdate = async (params) => {
  let result = await prisma.product_package.update({
    data: {
      name: params.name,
      period: params.period,
      price: params.price,
      stock: params.stock,
      status: params.status,
      edit_by: params.action_by,
      edit_on: new Date(),
    },
    where: {
      id: params.id,
    },
  });

  return result;
};

exports.packageDelete = async (params) => {
  let result = await prisma.product_package.update({
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

exports.categoryList = async (params) => {
  let result = await prisma.product_category.findMany({
    select: {
      product_id: true,
      category_id: true,
      product: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
    where: {
      del_on: null,
    },
    take: params.limit,
    skip: params.offset,
    orderBy: [{ category: { name: "asc" } }, { product: { name: "asc" } }],
  });

  return result;
};

exports.categoryDetail = async (params) => {
  let result = await prisma.product_category.findMany({
    select: {
      product_id: true,
      category_id: true,
      product: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
    where: {
      category_id: params.category_id,
      del_on: null,
    },
    take: params.limit,
    skip: params.offset,
    orderBy: { product: { name: "asc" } },
  });

  return result;
};

exports.categoryCreate = async (params) => {
  let result = await prisma.product_category.upsert({
    where: {
      product_id_category_id: {
        product_id: params.product_id,
        category_id: params.category_id,
      },
    },
    update: {
      edit_by: params.action_by,
      edit_on: new Date(),
      del_by: null,
      del_on: null,
    },
    create: {
      product_id: params.product_id,
      category_id: params.category_id,
      add_by: params.action_by,
      add_on: new Date(),
    },
  });

  return result;
};

exports.categoryDelete = async (params) => {
  let result = await prisma.product_category.update({
    data: {
      del_by: params.action_by,
      del_on: new Date(),
    },
    where: {
      product_id_category_id: {
        product_id: params.product_id,
        category_id: params.category_id,
      },
    },
  });

  return result;
};

exports.featureCreate = async (params) => {
  await prisma.product_feature.deleteMany({ where: { product_id: params.product_id } });

  let result = await prisma.product_feature.createMany({
    data: params,
  });

  return result;
};

exports.listDetail = async (params) => {
  let where = '';
  if (params.category_id != null) {
    where += ` and c.id = ${params.category_id} `;
  }

  if (params.product_name != null) {
    where += ` and pr.name like '%${params.product_name}%' `;
  }

  let result = await prisma.$queryRawUnsafe(`
  select
      pr.id as product_id,
      pr.name as product_name,
      coalesce(pr.description, '-') as product_description,
      pr.image_path as product_image_path,
      c.id as category_id,
      c.name as category_name,
      pp.price,
      (select case when count(1) > 0 then 1 else 0 end from digiduct.product_package where product_id = pr.id and status = 1 and stock <> 0) as available
    from digiduct.product pr
    inner join digiduct.product_category pc on pc.product_id = pr.id
    inner join digiduct.category c on c.id = pc.category_id
    inner join digiduct.product_package pp on pp.product_id = pr.id
    where 1=1
      ${where}
    order by pr.name
    limit ${params.limit}
    offset ${params.offset}
  `);

  for (let val of result) {
    let getFeatures = await prisma.product_feature.findMany({
      where: {
        product_id: val.product_id
      },
    });

    val.feature = getFeatures.map((item) => item.name)
  }

  return result;
};
