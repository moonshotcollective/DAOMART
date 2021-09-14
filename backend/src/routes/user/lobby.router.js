const express = require('express');
const passport = require('passport');
const Websocket = require('../../../websocket');
const UserController = require('../../controllers/user/user.controller');
const {HttpModule} = require('../../modules');
const router = express.Router();

router.post(
    '/product',
    (req, res, next) => next(),
    (req, res, next) => {
        const body = req.body || {};
        UserController.getUsersById(Websocket.getProductLobby(body))
            .then((result) => {
                HttpModule.sendResponse(req, res, result);
            })
            .catch((err) => {
                console.log(err);
                HttpModule.sendError(req, res, err);
            });
    }
);

module.exports = router;
