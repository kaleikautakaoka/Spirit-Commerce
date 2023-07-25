const { Model, DataTypes } = require('sequelize');


// eslint-disable-next-line import/extensions
const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      // Turn on auto increment
      autoIncrement: true,
      allowNull: false,
      // Instruct that this is the Primary Key
      primaryKey: true
  },

  category_name: {
      type: DataTypes.STRING,
      allowNull: false
  }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);


// Export the model
module.exports = Category;
