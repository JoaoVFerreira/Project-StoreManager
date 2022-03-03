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

const registerSale = async (req, res, next) => {
  try {
    const reponseSale = await salesService.registerSale(req.body);
    return res.status(201).json(reponseSale);
  } catch (error) {
    next(error);
  }
};

const updateSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await salesService.updateSaleProducts(id, req.body);
    return res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

const deleteSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    await salesService.deleteSale(id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSales,
  getSaleId,
  registerSale,
  updateSale,
  deleteSale,
};