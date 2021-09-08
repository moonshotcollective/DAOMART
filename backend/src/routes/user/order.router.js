const express = require('express');
const passport = require('passport');
const {OrderController} = require('../../controllers');
const {HttpModule} = require('../../modules');
const router = express.Router();

router.post(
    '/new',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};

        OrderController.newOrder({
            type: body.type,
            item: body.item,
            user: req.user.user_id,
        })
            .then((result) => {
                HttpModule.sendResponse(req, res, result);
            })
            .catch((err) => {
                HttpModule.sendError(req, res, err);
            });
    }
);
router.post(
    '/update-status',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        console.log('body update', body);
        OrderController.updateStatusByUser(req.user.user_id, {
            oid: body.oid,
            status: body.status,
        })
            .then((result) => {
                HttpModule.sendResponse(req, res, result);
            })
            .catch((err) => {
                HttpModule.sendError(req, res, err);
            });
    }
);

module.exports = router;
