const express = require('express');
const { isAuthenticated } = require('../middlewares');

const auth = require('./auth/auth.routes');
const users = require('./users/users.routes');
const data = require('./data/data.routes');

const router = express.Router();

router.use('/auth', auth);
router.use('/users', isAuthenticated, users);
router.use('/data', data);

module.exports = router;