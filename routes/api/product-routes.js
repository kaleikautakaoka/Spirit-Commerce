/* eslint-disable camelcase */
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');




// get all products
router.get('/', async (req, res) => {
  try {
    const productInfo = await Product.findAll();
    res.status(200).json(productInfo);
  } catch (err) { res.status(500).json(err); }
});

// get only one product
// findOne method
router.get('/:id', async (req, res) => {
  try {
    const productInfo = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!productInfo) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    } res.status(200).json(productInfo);
  } catch (err) { res.status(500).json(err); }
});

// create new product
router.post('/api/products', (req, res) => {
  Product.create(req.body)
    .then((product) => res.status(200).json(product))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    // eslint-disable-next-line consistent-return
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        // eslint-disable-next-line arrow-body-style
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            // eslint-disable-next-line camelcase
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    // eslint-disable-next-line arrow-body-style
    .then(() => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        // eslint-disable-next-line arrow-body-style
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// delete product
router.delete('/:id', async (req, res) => {
  try {
    const productInfo = await Product.destroy({
      where: { id: req.params.id },
    });
    if (!productInfo) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    } res.status(200).json(productInfo);
  } catch (err) { res.status(500).json(err); }
});
    
// export router
module.exports = router;
