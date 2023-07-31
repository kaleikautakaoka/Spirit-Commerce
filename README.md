# Spirit-Commerce
---

## Technologies
---
[![made-with-javascript](https://img.shields.io/badge/Made%20with-MySQL-1f425f.svg)](https://www.javascript.com)
[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com)
[![made-with-node.js](https://img.shields.io/badge/Made%20with-Node.js-1f425f.svg)](https://www.javascript.com)
[![made-with-express.js](https://img.shields.io/badge/Made%20with-Express.js-1f425f.svg)](http://expressjs.com/)
[![made-with-handle.js](https://img.shields.io/badge/Made%20with-Handle.js-1f425f.svg)](https://handlebarsjs.com/)

## Description
A backend application that allows the user to track, update, and delete product.
---

## Video Walkthrough
![Video-of-Code](https://app.castify.com/view/e161b65c-b010-4969-bcc7-9bd759b9b29d)

## Images of code and testing in insomnia
![Image-of-category-api](images/categspiritCommerce.png)
![Image-of-category-by-ID-route](images/categbyId.png)
![Image-of-category-get-route](images/getallcatspir.png)
![Image-of-Update-Put-Route](images/updatespir.png)


## Features
---

Descripiton of code snippet below
```
router.get async function will find all categories and include the product model. If there is no category found with that id, it will return a 404 error. If there is an error, it will return a 500 error.
```

```
router.get('/:id', async (req, res) => {
  try { 
    const categoryInfo = await Category.findByPk(req.params.id, {
      include: [ {model : Product} ],
    });
    if (!categoryInfo) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    } res.status(200).json(categoryInfo);
  }
  catch (err) {
    res.status(500).json(err);
  }
});
---

## Deployment Link
---

![SpiritCommerce](https://github.com/kaleikautakaoka/Spirit-Commerce)


## Table of contents
---
- [Installation](#installation)
- [Sources](#sources)
- [Credits](#credits)
- [License](#license)

---

## Installation
---

Below is the following installing steps to install and run this app.

1. Clone this repo. First cd into the folder where you would like to save this project. Then enter the command below.

```sh
git clone git@github.com:kaleikautakaoka/Spirit-Commerce.git
```

3. Run this command below to seed the data base. You will find this configuration in the package.json file provided in the repo.

```sh
npm run seed
```

4. Start the server by running the code below. This is convienent as it will be using nodemon.

```sh
npm run watch
```

5. Test routes via insomnia
```
Insomnia: https://insomnia.rest/download
```
 PORT: http://localhost:3001
```
## Sources
---
- [sequelize](https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/)
- [nodesource](https://nodesource.com/)
- [medium](https://medium.com/the-javascript-dojo/sequelize-project-setup-4a6a566c6cfa)
- [sebhastian](https://sebhastian.com/mysql-failed-to-open-file-error-2/)
- [stackoverflow](https://stackoverflow.com/questions/14684063/mysql-source-error-2)
- [digitalocean](https://www.digitalocean.com/community/tutorials/how-to-use-sequelize-with-node-js-and-mysql)
- [turing](https://www.turing.com/kb/mysql-connection-with-node-js-using-sequelize-and-express)
- [eslint](https://www.npmjs.com/package/eslint-plugin-prettier)

## Credits
---
DU Bootcamp Cirruculm
Tutor: Andres Jimenez

## License
---
MIT




