'use strict';

const tableCategoryName = 'categorys';
const tableProductName = 'products';

async function seedCategories(queryInterface) {
  await queryInterface.bulkInsert(
    tableCategoryName,
    [
      {
        name: 'shoes',
        description: 'abc',
        status:'active'
      },
      {
        name: 'shirt',
        description: 'abc',
        status:'active'
      },
      {
        name: 'Pant',
        description: 'abc',
        status:'active'
      },
    ],
    {},
  );
}

async function seedProducts(queryInterface) {
  await queryInterface.bulkInsert(
    tableProductName,
    [
      {
        name: 'Shoes',
        sku:'	',
        price:'3500',
        stock:'30',
        description: 'abc',
        categoryId: 1,
        status:'active'
      },
      {
        name: 't-shirt',
        sku:'',
        price:'3500',
        stock:'30',
        description: 'abc',
        categoryId: 2,
        status:'active'
      },
      {
        name: 'polo shirt',
        sku:'',
        price:'3500',
        stock:'30',
        description: 'abc',
        categoryId: 2,
        status:'active'
      },
      {
        name: 'jeans',
        sku:'	',
        price:'3500',
        stock:'30',
        description: 'abc',
        categoryId: 3,
        status:'active'
      },
    ],
    {},
  );
}



module.exports = {
  async up(queryInterface) {
    await seedCategories(queryInterface);
    await seedProducts(queryInterface);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(tableCategoryName, null, {});
    await queryInterface.bulkDelete(tableProductName, null, {});
  },
};
