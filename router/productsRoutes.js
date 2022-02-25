const express = require('express');

const router = express.Router();

const { productBodyValidation } = require('../middlewares/productsBodyValidation');

const { 
    getAllProducts,
    getProductById,
    registerProduct,
    updateProduct,
} = require('../controllers/productsController');

router.get('/', getAllProducts);

router.post('/', productBodyValidation, registerProduct);

router.get('/:id', getProductById);

router.put('/:id', updateProduct);

module.exports = router;