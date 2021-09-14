const express = require('express');
const passport = require('passport');
const {ProductCategoryController} = require('../../controllers');
const {HttpModule} = require('../../modules');
const router = express.Router();

router.post(
    '/',
    passport.authenticate('jwt.admin', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
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
router.post(
    '/cid',
    passport.authenticate('jwt.admin', {session: false}),
    (req, res, next) => {
        const body = req.body || {};

        ProductCategoryController.getById(body)
            .then((result) => {
                HttpModule.sendResponse(req, res, result);
            })
            .catch((err) => {
                HttpModule.sendError(req, res, err);
            });
    }
);

module.exports = router;
