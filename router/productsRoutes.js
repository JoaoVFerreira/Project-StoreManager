const express = require('express');

const router = express.Router();

const { productBodyValidation } = require('../middlewares/productsBodyValidation');

const { 
    getAllProducts,
    getProductById,
    registerProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productsController');

router.get('/', getAllProducts);

router.post('/', productBodyValidation, registerProduct);

router.get('/:id', getProductById);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;