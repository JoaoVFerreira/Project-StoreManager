const express = require('express');

const router = express.Router();

const { getAllSales } = require('../controllers/salesController');

router.get('/', getAllSales);

router.get('/:id');

module.exports = router;