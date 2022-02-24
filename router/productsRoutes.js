const express = require('express');

const router = express.Router();

const { getAllProducts, getProductById } = require('../controllers/productsController');
// const { verifyGetAllProducts } = require('../middlewares/productsMiddleware');

router.get('/', getAllProducts);

router.get('/:id', getProductById);

module.exports = router;