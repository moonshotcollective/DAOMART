const HttpLogController = require('../../controllers/network-logs/http-log/http-log.controller');

const sendResponse = (req, res, result) => {
    HttpLogController.__make__(
        'res',
        req.method,
        req.originalUrl,
        req.ip,
        result,
        req.user
    );

    res.json({
        success: true,
        data: result,
    });
};

const sendError = (req, res, err) => {
    HttpLogController.__make__(
        'resERR',
        req.method,
        req.originalUrl,
        req.ip,
        err,
        req.user
    );
    console.log('err', err);
    if (err && err.code) {
        res.status(err.code).send(err);
    } else {
        res.status(500).send({code: 500, msg: 'Something went wrong'});
    }
};

module.exports = {
    sendResponse,
    sendError,
};
