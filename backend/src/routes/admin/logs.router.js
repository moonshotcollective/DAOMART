const express = require('express');
const passport = require('passport');
const HttpLogController = require('../../controllers/network-logs/http-log/http-log.controller');
const {HttpModule} = require('../../modules');
const router = express.Router();

router.post(
    '/http',
    passport.authenticate('jwt.admin', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        HttpLogController.getLogs(body)
            .then((result) => {
                HttpModule.sendResponse(req, res, result);
            })
            .catch((err) => {
                HttpModule.sendError(req, res, err);
            });
    }
);
router.post(
    '/unique-ip',
    passport.authenticate('jwt.admin', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        HttpLogController.getUniqueIpLogs(body)
            .then((result) => {
                HttpModule.sendResponse(req, res, result);
            })
            .catch((err) => {
                HttpModule.sendError(req, res, err);
            });
    }
);

module.exports = router;
