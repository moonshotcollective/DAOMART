const express = require('express');
const passport = require('passport');
const {ContractController} = require('../../controllers');
const {HttpModule} = require('../../modules');
const router = express.Router();

router.post(
    '/candy',
    (req, res, next) => next(),
    (req, res, next) => {
        const body = req.body || {};
        ContractController.getTokenContracts(body)
            .then((result) => {
                HttpModule.sendResponse(req, res, result[0]);
            })
            .catch((err) => {
                HttpModule.sendError(req, res, err);
            });
    }
);

module.exports = router;
