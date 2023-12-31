// Purpose: To provide routes to perform CRUD operations on the Category model
const router = require('express').Router();
// Bringing in Category and Product models
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // All categories
  // be sure to include its associated Products
  try {
    const categoryInfo = await Category.findAll({
      include: [ {model : Product} ],
    });
    res.status(200).json(categoryInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try { 
    const categoryInfo = await Category.findByPk(req.params.id, {
      include: [ { model : Product } ],
    });
    if (!categoryInfo) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    } res.status(200).json(categoryInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
 try {
   const categoryInfo = await Category.create(req.body);
   res.status(200).json(categoryInfo);
 } catch (err) {
    res.status(400).json(err);
  }
});



router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
  const categoryInfo = await Category.update( 
    { category_name: req.body.category_name },
    {
    where:
     { id: req.params.id },
  });
  if (!categoryInfo[0]) {
    res.status(404).json({ message: 'No category found with that id!' });
    return;
  }
  res.status(200).json(categoryInfo);
} catch (err) {
  res.status(500).json(err);
}
});



router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
 try {
   const categoryInfo = await Category.destroy({
     where: {
       id: req.params.id,
     },
   });
   if (!categoryInfo) {
     res.status(404).json({ message: 'No category found with that id!' });
     return;
   }
   res.status(200).json(categoryInfo);
 } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
