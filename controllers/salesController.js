const salesService = require('../services/salesService');

const getAllSales = async (_req, res, next) => {
  try {
    const sales = await salesService.getAll();
    res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};

const getSaleId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const saleId = await salesService.findById(id);
    res.status(200).json(saleId);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSales,
  getSaleId,
};