const router = require('express').Router();
const { Product, Category, Tag } = require('../../models');




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
// findOne method
router.get('/:id', async (req, res) => {
  try {
    const productInfo = await Product.findOne({
      where: { id: req.params.id },
      include: [Category, Tag],
    });
    if (!productInfo) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    } res.status(200).json(productInfo);
  } catch (err) { res.status(500).json(err); }
});

// post route
router.post('/', async (req, res) => {
  try {
    const productInfo = await Product.create(req.body);
    res.status(200).json(productInfo);
  } catch (err) { res.status(400).json(err); }
});
 
// update product informatioin
router.put('/:id', async (req, res) => {
  try {
    const productInfo = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    if (!productInfo[0]) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    } res.status(200).json(productInfo);
  } catch (err) { res.status(500).json(err); }
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
