const connection = require('./connection');

const getAll = async () => {
  const QUERY = 'SELECT * FROM products ORDER BY id ASC';

  const [rows] = await connection.execute(QUERY);
  return rows;
};

const findById = async (id) => {
  const QUERY = 'SELECT * FROM products WHERE id = ?';

  const [rows] = await connection.execute(QUERY, [id]);
  return rows;
};

const registerProduct = async (name, quantity) => {
  const allProducts = await getAll();
  if (allProducts.find((row) => row.name === name)) return null;

  const QUERY = 'INSERT INTO StoreManager.products (name, quantity) VALUES(?, ?)';
  const [registered] = await connection.execute(QUERY, [name, quantity]);
  
  return {
    id: registered.insertId,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  findById,
  registerProduct,
};
