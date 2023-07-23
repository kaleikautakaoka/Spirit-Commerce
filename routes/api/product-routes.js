const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');




// get all products
router.get('/', async (req, res) => {
  try {
    const productInfo = await Product.findAll({
      include: [Category, Tag],
    });
    res.status(200).json(productInfo);
  } catch (err) { res.status(500).json(err); }
});

// get only one product
//findOne method
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findOne({ where: { id: req.params.id }, include: [Category, Tag] })
    .then((product) => res.json(product))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );
});

// create new product
//post route
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if product tags exist then..
      // create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // respond if no product tags
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product informatioin
router.put('/:id', (req, res) => {
  // update id
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      //findAll method
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      //map method
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      //filter method, includes method, map method
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      //!req.body.tagIds.includes(tag_id)
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      //Promise.all method with bulkCreate and destroy methods
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

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: { id: req.params.id },
  })
    .then((deletedProduct) => {
      res.json(deletedProduct)
    })
});

//export router
module.exports = router;
