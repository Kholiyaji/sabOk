const db = require('../connection');

// 🔹 Find user by email ONLY
const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0];
};

// 🔹 Create user
const createUser = async (id, name, email, phone, password) => {
  const [result] = await db.query(
    `INSERT INTO users (id, name, email, phone_number, password)
     VALUES (?, ?, ?, ?, ?)`,
    [id, name, email, phone, password]
  );
  return result;
};

module.exports = {
  findUserByEmail,
  createUser,
};