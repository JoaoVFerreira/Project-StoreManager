const connection = require('./connection');

const QUERYALL = `SELECT * FROM StoreManager.sales
JOIN StoreManager.sales_products AS SP
ON SP.sale_id = id
ORDER BY sale_id ASC,
product_id ASC;`;

const getAll = async () => {
  const [rows] = await connection.execute(QUERYALL);
  return rows.map((row) => ({
    saleId: row.sale_id,
    date: row.date,
    productId: row.product_id,
    quantity: row.quantity,
  }));
};

module.exports = {
  getAll,
};