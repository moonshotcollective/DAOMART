const express = require('express');
const router = express.Router();

const userRoutes = require('./user.router');
const lobbyRoutes = require('./lobby.router');
const productRoutes = require('./product.router');
const orderRoutes = require('./order.router');
const contractRoutes = require('./contract.router');

router.use('/user', userRoutes);
router.use('/lobby', lobbyRoutes);
router.use('/product', productRoutes);
router.use('/order', orderRoutes);
router.use('/contract', contractRoutes);

module.exports = router;
