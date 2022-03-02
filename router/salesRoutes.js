const express = require('express');

const router = express.Router();

const { 
  getAllSales, 
  getSaleId,
  registerSale,
  updateSale } = require('../controllers/salesController');

router.get('/', getAllSales);

router.get('/:id', getSaleId);

router.post('/', registerSale);

router.put('/:id', updateSale);

module.exports = router;