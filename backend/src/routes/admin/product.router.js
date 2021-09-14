const express = require('express');
const passport = require('passport');
const {ProductController} = require('../../controllers');
const {HttpModule} = require('../../modules');
const router = express.Router();

router.get(
    '/',
    passport.authenticate('jwt.admin', {session: false}),
    (req, res, next) => {
        const body = req.params || {};

        ProductController.getProducts(body)
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

        ProductController.makeNewProduct(body)
            .then((result) => {
                HttpModule.sendResponse(req, res, result);
            })
            .catch((err) => {
                HttpModule.sendError(req, res, err);
            });
    }
);

router.post(
    '/pid',
    passport.authenticate('jwt.admin', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        ProductController.getById(body)
            .then((result) => {
                HttpModule.sendResponse(req, res, result);
            })
            .catch((err) => {
                HttpModule.sendError(req, res, err);
            });
    }
);

module.exports = router;
