const salesModel = require('../models/salesModel');

const saleNotFound = { status: 404, message: 'Sale not found' };
const AmountError = { status: 422, message: 'Such amount is not permitted to sell' };

const getAll = async () => {
  const sales = await salesModel.getAll();
  const noSalesError = { status: 404, message: 'There is no sales in database' };
  if (sales.length === 0) throw noSalesError;
  return sales;
};

const findById = async (id) => {
  const sale = await salesModel.findById(id);
  if (sale.length === 0) throw saleNotFound;
  return sale;
};

const registerSale = async (body) => {
  const isQuantityAllowed = await salesModel.verifyProductQuantity(body);
  const isAllowed = isQuantityAllowed.includes(true);
  if (!isAllowed) throw AmountError;
  const sales = await salesModel.registerSale(body);
  return sales;
};

const updateSaleProducts = async (id, body) => {
  const updateSale = await salesModel.updateSaleProducts(id, body);
  return updateSale;
};

const deleteSale = async (id) => {
  const deletedSale = await salesModel.deleteSale(id);
  if (!deletedSale) throw saleNotFound;
  return deletedSale;
};

module.exports = {
  getAll,
  findById,
  registerSale,
  updateSaleProducts,
  deleteSale,
};