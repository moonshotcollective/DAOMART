const AdminJWTPassport = require('./admin.passport');
const UserJWTPassport = require('./user.passport');

const Initiate = (passport) => {
    AdminJWTPassport(passport);
    UserJWTPassport(passport);
};

module.exports = {Initiate};
