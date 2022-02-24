const express = require('express');

const router = express.Router();

const { getAllSales, getSaleId } = require('../controllers/salesController');

router.get('/', getAllSales);

router.get('/:id', getSaleId);

module.exports = router;