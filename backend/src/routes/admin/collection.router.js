const express = require('express');
const passport = require('passport');
const {ProductController, CollectionController} = require('../../controllers');

const router = express.Router();

router.get(
    '/collections',
    passport.authenticate('jwt.admin', {session: false}),
    (req, res, next) => {
        const body = req.params || {};
        CollectionController.getCollections(body)
            .then((result) => {
                HttpModule.sendResponse(req, res, result);
            })
            .catch((err) => {
                HttpModule.sendError(req, res, err);
            });
    }
);
module.exports = router;
