const express = require('express');
const passport = require('passport');
const {ArchiveController} = require('../../controllers');
const {HttpModule} = require('../../modules');
const router = express.Router();

router.get(
    '/archives',
    passport.authenticate('jwt.admin', {session: false}),
    (req, res, next) => {
        const body = req.params || {};
        ArchiveController.getArchives(body)
            .then((result) => {
                HttpModule.sendResponse(req, res, result);
            })
            .catch((err) => {
                HttpModule.sendError(req, res, err);
            });
    }
);

module.exports = router;
