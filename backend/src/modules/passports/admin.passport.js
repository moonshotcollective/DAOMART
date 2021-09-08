const {Strategy, ExtractJwt} = require('passport-jwt');
const {USER_SECRET} = require('../../../config');
const UserController = require('../../controllers/user/user.controller');
const HttpLogController = require('../../controllers/network-logs/http-log/http-log.controller');
const AdminJWTPassport = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.passReqToCallback = true;
    opts.secretOrKey = USER_SECRET;

    passport.use(
        'jwt.admin',
        new Strategy(opts, function (req, jwt_payload, done) {
            HttpLogController.__make__(
                'req',
                req.method,
                req.originalUrl,
                req.ip,
                req.body,
                req.user
            );
            UserController.__getUserByAccountId__(jwt_payload)
                .then((userDoc) => {
                    return done(null, userDoc);
                })
                .catch((err) => {
                    console.log('err', err);
                    return done(null, null, err);
                });
        })
    );
};

module.exports = AdminJWTPassport;
