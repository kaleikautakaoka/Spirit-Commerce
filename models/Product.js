// import important parts of sequelize library and database connection from config.js
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');


// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Instruct that this is the Primary Key
      primaryKey: true,
      // Turn on auto increment
      autoIncrement: true
  },
  product_name: {
      type: DataTypes.STRING,
      allowNull: false
  },
  price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      // Validate that the value is a decimal
      validate: {
          isDecimal: true
      }
  },
  stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Set a default value of 10
      defaultValue: 10,
      // Validate that the value is numeric
      validate: {
          isNumeric: true
      }
  },
  category_id: {
      type: DataTypes.INTEGER,
      // Reference the Category model's id
      references: {
          model: 'category',
          key: 'id'
      }
  }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
