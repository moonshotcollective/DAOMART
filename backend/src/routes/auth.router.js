const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user/user.controller');
const {HttpModule} = require('../modules');
router.get('/nonce/:addr', (req, res, next) => {
    const body = req.params || {};

    UserController.getNonceForAddress(body.addr)
        .then((nonce) => {
            HttpModule.sendResponse(req, res, {nonce: nonce});
        })
        .catch((err) => {
            console.log(err);
            HttpModule.sendError(req, res, err);
        });
});

router.post('/login', (req, res, next) => {
    const body = req.body || {};
    UserController.Authenticate(body)
        .then((result) => {
            HttpModule.sendResponse(req, res, result);
        })
        .catch((err) => {
            console.log(err);
            HttpModule.sendError(req, res, err);
        });
});
router.post('/check', (req, res, next) => {
    const body = req.body || {};
    UserController.IsSignedUp(body)
        .then((result) => {
            HttpModule.sendResponse(req, res, result);
        })
        .catch((err) => {
            console.log(err);
            HttpModule.sendError(req, res, err);
        });
});

module.exports = router;
