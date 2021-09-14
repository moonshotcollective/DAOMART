const express = require('express');
const passport = require('passport');
const UserController = require('../../controllers/user/user.controller');
const {HttpModule} = require('../../modules');
const Websocket = require('../../../websocket');
const router = express.Router();

router.post(
    '/lobby',
    passport.authenticate('jwt.admin', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        UserController.getUsersById(Websocket.getLobby())
            .then((result) => {
                HttpModule.sendResponse(req, res, result);
            })
            .catch((err) => {
                console.log(err);
                HttpModule.sendError(req, res, err);
            });
    }
);
router.post(
    '/id',
    passport.authenticate('jwt.admin', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        UserController.getById(body)
            .then((result) => {
                HttpModule.sendResponse(req, res, result);
            })
            .catch((err) => {
                HttpModule.sendError(req, res, err);
            });
    }
);
router.post(
    '/query',
    passport.authenticate('jwt.admin', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        UserController.getUsersByQuery(body)
            .then((result) => {
                HttpModule.sendResponse(req, res, result);
            })
            .catch((err) => {
                HttpModule.sendError(req, res, err);
            });
    }
);

router.post(
    '/update-badge',
    passport.authenticate('jwt.admin', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        UserController.updateUserBadge(body)
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
    passport.authenticate('jwt.admin', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        UserController.updateUserStatus(body)
            .then((result) => {
                HttpModule.sendResponse(req, res, result);
            })
            .catch((err) => {
                HttpModule.sendError(req, res, err);
            });
    }
);

module.exports = router;
