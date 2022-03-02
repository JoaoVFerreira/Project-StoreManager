const express = require('express');

const router = express.Router();

const { saleBodyValidation } = require('../middlewares/salesBodyValidation');

const { 
  getAllSales, 
  getSaleId,
  registerSale,
  updateSale,
  deleteSale,
} = require('../controllers/salesController');

router.get('/', getAllSales);

router.get('/:id', getSaleId);

router.post('/', saleBodyValidation, registerSale);

router.put('/:id', saleBodyValidation, updateSale);

router.delete('/:id', deleteSale);

module.exports = router;