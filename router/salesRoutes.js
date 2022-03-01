const express = require('express');

const router = express.Router();

const { getAllSales, getSaleId, registerSale } = require('../controllers/salesController');

router.get('/', getAllSales);

router.get('/:id', getSaleId);

router.post('/', registerSale);

module.exports = router;