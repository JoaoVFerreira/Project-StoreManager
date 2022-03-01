const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAll();
  const noSalesError = { status: 404, message: 'There is no sales in database' };
  if (sales.length === 0) throw noSalesError;

  return sales;
};

const findById = async (id) => {
  const sale = await salesModel.findById(id);
  const noIdError = { status: 404, message: 'Sale not found' };
  if (sale.length === 0) throw noIdError;

  return sale;
};

const registerSale = async (body) => {
  const sales = await salesModel.registerSale(body);
  return sales;
};

module.exports = {
  getAll,
  findById,
  registerSale,
};