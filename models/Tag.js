const { Model, DataTypes } = require('sequelize');

// eslint-disable-next-line import/extensions
const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
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
  tag_name: {
      type: DataTypes.STRING
  }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

// Export the model
module.exports = Tag;
