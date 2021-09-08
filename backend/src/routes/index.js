const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.router');
const userRoutes = require('./user');
const adminRoutes = require('./admin');

router.use('/', userRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
