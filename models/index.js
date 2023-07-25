// Importing models for use in this file
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');





// Products belongsTo Category
// Categories have many Products
// Products belongToMany Tags (through ProductTag)
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
 
});

Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// super many to many relationship
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'product_id' });
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tag_id' });
Product.hasMany(ProductTag);
ProductTag.belongsTo(Product);
Tag.hasMany(ProductTag);
ProductTag.belongsTo(Tag);

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
