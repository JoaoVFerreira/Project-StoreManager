const connection = require('./connection');

const QUERYALL = `SELECT * FROM StoreManager.sales
JOIN StoreManager.sales_products AS SP
ON SP.sale_id = id
ORDER BY sale_id ASC,
product_id ASC;`;

const QUERYID = `SELECT * FROM StoreManager.sales
JOIN StoreManager.sales_products AS SP
ON SP.sale_id = id
WHERE sale_id = ?
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

const findById = async (id) => {
  const [rows] = await connection.execute(QUERYID, [id]);
  return rows.map((row) => ({
    date: row.date,
    productId: row.product_id,
    quantity: row.quantity,
  }));
};

module.exports = {
  getAll,
  findById,
};