const express = require('express');
const passport = require('passport');
const {ProductCategoryController} = require('../../controllers');
const {HttpModule} = require('../../modules');
const router = express.Router();

router.get(
    '/',
    passport.authenticate('jwt.admin', {session: false}),
    (req, res, next) => {
        const body = req.params || {};
        console.log('body', body);

        ProductCategoryController.getCategories(body)
            .then((result) => {
                HttpModule.sendResponse(req, res, result);
            })
            .catch((err) => {
                HttpModule.sendError(req, res, err);
            });
    }
);
router.post(
    '/new',
    passport.authenticate('jwt.admin', {session: false}),
    (req, res, next) => {
        const body = req.body || {};

        ProductCategoryController.makeNewCategory(body)
            .then((result) => {
                HttpModule.sendResponse(req, res, result);
            })
            .catch((err) => {
                HttpModule.sendError(req, res, err);
            });
    }
);

module.exports = router;
