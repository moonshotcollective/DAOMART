const mongoose = require('mongoose');
const Config = require('../config');

mongoose.Promise = global.Promise;

const connection = mongoose.connect(Config.DATABASE_NAMURL, {
    useNewUrlParser: true,
});

const Initiate = async () => {
    return new Promise((resolve, reject) => {
        connection
            .then((db) => {
                console.log('[i] db connection established');
                resolve(true);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
};

module.exports = {Initiate};
