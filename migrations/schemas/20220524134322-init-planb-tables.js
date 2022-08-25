'use strict';

const tableProductName = 'products';
const tableCategoryName = 'categorys';

function getCommonFieldsWhenCreate(Sequelize) {
  return {
    status: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'active',
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now'),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now'),
    },
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  };
}

async function createCategoryTable(queryInterface, Sequelize) {
  await queryInterface.createTable(tableCategoryName, {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ...getCommonFieldsWhenCreate(Sequelize),
  });
}

async function createProductTable(queryInterface, Sequelize) {
  await queryInterface.createTable(tableProductName, {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    sku: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    price: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    stock: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    categoryId: {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: tableCategoryName,
        },
        key: 'id',
      },
      allowNull: true,
    },
    imagePath: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    ...getCommonFieldsWhenCreate(Sequelize),
  });
}


module.exports = {
  async up(queryInterface, Sequelize) {
    await createCategoryTable(queryInterface, Sequelize);
    await createProductTable(queryInterface, Sequelize);
  },
  async down(queryInterface) {
    await queryInterface.dropTable(tableCategoryName);
    await queryInterface.dropTable(tableProductName);
  },
};
