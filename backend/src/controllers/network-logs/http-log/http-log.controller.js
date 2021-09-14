const HttpLog = require('./http-log.model');
const geoip = require('geoip-lite');
const __make__ = (type, method, route, ip, data, user) => {
    return new Promise((resolve, reject) => {
        const newLog = new HttpLog({
            type: type,
            method: method,
            route: route,
            ip: ip,
            geolocation: JSON.stringify(geoip.lookup(ip)),
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

const getLogs = ({method, route, ip, user} = {}) => {
    return __findLogsByQuery__({method, route, ip, user});
};
const getUniqueIpLogs = ({}) => {
    return __findUniqueIpLogs__({});
};

module.exports = {
    __make__,
    getLogs,
    getUniqueIpLogs,
};

const __findLogsByQuery__ = (
    {method, route, ip, user} = {},
    {skip, limit} = {}
) => {
    return new Promise((resolve, reject) => {
        HttpLog.find({
            $or: [
                method ? {method: method} : {},
                route ? {route: route} : {},
                ip ? {ip: ip} : {},
                user ? {user: user} : {},
            ],
        })
            .skip(skip || 0)
            .limit(limit || 100)
            .lean()
            .then((doc) => {
                if (doc) {
                    resolve(parseLogs(doc));
                } else {
                    reject('NOT_FOUND');
                }
            })
            .catch(reject);
    });
};

const __findUniqueIpLogs__ = ({}) => {
    return new Promise((resolve, reject) => {
        HttpLog.aggregate([
            {$match: {}},
            {
                $group: {
                    _id: null,
                    ips: {$addToSet: '$ip'},
                    geolocations: {$addToSet: '$geolocation'},
                },
            },
            // {$project: {_id: '$_id', geolocation: '$geolocation'}},
        ])
            .then((ddocs) => {
                resolve(ddocs[0] || []);
            })
            .catch(reject);
    });
};

const parseLogs = (ddocs) => {
    return ddocs.map((d) => ({
        type: d.type,
        method: d.method,
        route: d.route,
        ip: d.ip,
        geolocation: d.geolocation,
    }));
};
