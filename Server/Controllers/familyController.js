const { v4: uuidv4 } = require("uuid");
const familyModel = require("../models/familyModel");

// 🔹 Create family
const createFamily = async (req, res) => {
  const { name, userId } = req.body;

  try {
    const familyId = uuidv4();

    // create family
    await familyModel.createFamily(familyId, name, userId);

    // add creator as admin
    await familyModel.addMember(uuidv4(), familyId, userId, "admin");

    res.json({
      message: "Family created ✅",
      familyId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Add member
const addMember = async (req, res) => {
  const { familyId, userId } = req.body;

  try {
    
    // check if member already exists in family
    const existingMember = await familyModel.findMember(familyId, userId);

    if (existingMember) {
      return res.status(400).json({
        message: "User already exists in family",
      });
    }

    await familyModel.addMember(uuidv4(), familyId, userId);

    res.json({ message: "Member added ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Get members
const getMembers = async (req, res) => {
  const { familyId } = req.params;

  try {
    const members = await familyModel.getFamilyMembers(familyId);
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createFamily,
  addMember,
  getMembers,
};
