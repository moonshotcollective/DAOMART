const HttpLog = require('./http-log.model');
const geoip = require('geoip-lite');
const __make__ = (type, method, route, ip, data, user) => {
    return new Promise((resolve, reject) => {
        const newLog = new HttpLog({
            type: type,
            method: method,
            route: route,
            ip: ip,
            geolocation: geoip.lookup(ip),
            data: JSON.stringify(data || {}).substring(0, 1e4),
            user: user ? user.user_id : null,
        });

        newLog
            .save()
            .then((newDoc) => {
                resolve(newDoc.toObject());
            })
            .catch(reject);
    });
};

const getLogs = ({method, route, ip, user}) => {
    return __findLogsByQuery__({method, route, ip, user});
};

module.exports = {
    __make__,
    getLogs,
};

const __findLogsByQuery__ = ({method, route, ip, user}) => {
    return new Promise((resolve, reject) => {
        HttpLog.find({
            ...(method ? {method: method} : {}),
            ...(route ? {route: route} : {}),
            ...(ip ? {ip: ip} : {}),
            ...(user ? {user: user} : {}),
        })
            .limit(100)
            .lean()
            .then((doc) => {
                if (doc) {
                    resolve(doc);
                } else {
                    reject('NOT_FOUND');
                }
            })
            .catch(reject);
    });
};

const parseLogs = (ddocs) => {
    return ddocs.map((d) => ({}));
};
