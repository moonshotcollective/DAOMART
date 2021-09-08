const express = require('express');
const router = express.Router();

const userRoutes = require('./user.router');
const logsRoutes = require('./logs.router');
const categoryRoutes = require('./category.router');
const productRoutes = require('./product.router');
const orderRoutes = require('./order.router');
const contractRoutes = require('./contract.router');
const collectionRoutes = require('./collection.router');
const archiveRoutes = require('./archive.router');

router.use('/user', userRoutes);
router.use('/logs', logsRoutes);
router.use('/category', categoryRoutes);
router.use('/product', productRoutes);
router.use('/order', orderRoutes);
router.use('/contract', contractRoutes);
router.use('/collection', collectionRoutes);
router.use('/archive', archiveRoutes);

router.get('/foo', (req, res, next) => {
    res.json('bar');
});

module.exports = router;
