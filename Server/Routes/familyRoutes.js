const express = require('express');
const router = express.Router();
const familyController = require('../controllers/familyController');

// 🔹 Create family
router.post('/create', familyController.createFamily);

// 🔹 Add member
router.post('/add-member', familyController.addMember);

// 🔹 Get members
router.get('/:familyId', familyController.getMembers);

module.exports = router;