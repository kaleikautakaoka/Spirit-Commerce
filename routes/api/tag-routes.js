const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagInfo = await Tag.findAll({
      include: [ { model : Product } ],
    });
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }

  // be sure to include its associated Product data

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagInfo = await Tag.findByPk(req.params.id, {
      include: [ { model : Product } ],
    });
    if (!tagInfo) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    } res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagInfo = await Tag.create(req.body);
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
  const tagInfo = await Tag.update( 
    { tag_name: req.body.tag_name },
    {
    where:
     { id: req.params.id },
  });
  if (!tagInfo[0]) {
    res.status(404).json({ message: 'No tag found with that id!' });
    return;
  }
  res.status(200).json(tagInfo);
} catch (err) {
  res.status(500).json(err);
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});


// export router
module.exports = router;
