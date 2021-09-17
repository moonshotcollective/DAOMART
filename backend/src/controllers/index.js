const ProductCategoryController = require('./product/product-category.controller');
const ProductController = require('./product/product.controller');
const OrderController = require('./order/order.controller');
const ContractController = require('./contract/contract.controller');
const QuadraticLootContractController = require('./contract/quadratic-loot/quadratic-loot.controller');

module.exports = {
    ProductCategoryController,
    ProductController,
    OrderController,
    ContractController,
    QuadraticLootContractController,
};
