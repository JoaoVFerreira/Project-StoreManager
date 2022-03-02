const express = require('express');

const router = express.Router();

const { saleBodyValidation } = require('../middlewares/salesBodyValidation');

const { 
  getAllSales, 
  getSaleId,
  registerSale,
  updateSale } = require('../controllers/salesController');

router.get('/', getAllSales);

router.get('/:id', getSaleId);

router.post('/', saleBodyValidation, registerSale);

router.put('/:id', saleBodyValidation, updateSale);

module.exports = router;