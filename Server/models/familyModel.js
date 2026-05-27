const db = require('../connection');

// 🔹 Create family
const createFamily = async (id, name, created_by) => {
  const [result] = await db.query(
    `INSERT INTO families (id, name, created_by)
     VALUES (?, ?, ?)`,
    [id, name, created_by]
  );
  return result;
};

// 🔹 Add member to family
const addMember = async (id, family_id, user_id, role = 'member') => {
  const [result] = await db.query(
    `INSERT INTO family_members (id, family_id, user_id, role)
     VALUES (?, ?, ?, ?)`,
    [id, family_id, user_id, role]
  );
  return result;
};

// 🔹 Get all members of a family (IMPORTANT JOIN)
const getFamilyMembers = async (family_id) => {
  const [rows] = await db.query(`
    SELECT u.id, u.name, u.email, u.phone_number
    FROM family_members fm
    JOIN users u ON fm.user_id = u.id
    WHERE fm.family_id = ?
  `, [family_id]);

  return rows;
};

module.exports = {
  createFamily,
  addMember,
  getFamilyMembers,
};