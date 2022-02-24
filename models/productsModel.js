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

module.exports = {
  getAll,
  findById,
};