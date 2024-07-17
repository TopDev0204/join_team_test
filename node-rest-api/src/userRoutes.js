const express = require('express');
const { getUsersWithinRadius, createUser } = require('./userController');

const router = express.Router();

router.get('/users', getUsersWithinRadius);
router.post('/users', createUser);

module.exports = router;
