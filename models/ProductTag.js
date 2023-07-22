const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Instruct that this is the Primary Key
        primaryKey: true,
        // Turn on auto increment
        autoIncrement: true
  },
  product_id: {
      type: DataTypes.INTEGER,
      // Reference the Product model's id
      references: {
          model: 'product',
          key: 'id'
      }
  },
  tag_id: {
      type: DataTypes.INTEGER,
      // Reference the Tag model's id
      references: {
          model: 'tag',
          key: 'id'
      }
  }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
