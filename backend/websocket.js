const jwt = require('jsonwebtoken');
const Config = require('./config');
const UserController = require('./src/controllers');
const {Server} = require('socket.io');

const OPTIONS = {
    pingTimeout: 10 * 1000,
    pingInterval: 30 * 1000,
    upgradeTimeout: 10 * 1000,
    maxHttpBufferSize: 1e5, //1e6
    transports: ['polling', 'websocket'],
    allowUpgrades: true,
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        // allowedHeaders: ["my-custom-header"],
        // credentials: true
    },
};
let io;
const Initiate = async (server) => {
    io = new Server(server, OPTIONS);
    io.use(userSocketAuthMiddleware);
    io.on('connection', (socket) => {
        console.log(`[MAIN WEBSOCKET] socket connected  :  ${socket.id}`);

        UserController.getUserById(socket.user).then((doc) => {
            socket.emit('ON_ENTER', {
                data: {
                    user_id: doc._id,
                    name: doc.name,
                    address: doc.address,
                },
            });
            socket.broadcast.emit('ON_ENTER', {
                data: {
                    user_id: doc._id,
                    name: doc.name,
                    address: doc.address,
                },
            });
        });

        socket.on('disconnect', () => {
            UserController.getUserById(socket.user).then((doc) => {
                socket.emit('ON_EXIT', {
                    data: {
                        user_id: doc._id,
                        name: doc.name,
                        address: doc.address,
                    },
                });
                socket.broadcast.emit('ON_EXIT', {
                    data: {
                        user_id: doc._id,
                        name: doc.name,
                        address: doc.address,
                    },
                });
            });
            console.log(`[MAIN WEBSOCKET] socket disconnected : ${socket.id}`);
        });
    });
    console.log('[MAIN WEBSOCKET] Main WEBSOCKET Initiated');
};

module.exports = {
    Initiate,
};

const rawrrr = 'Bearer ';
const userSocketAuthMiddleware = (socket, next) => {
    if (
        !socket ||
        !socket.handshake ||
        !socket.handshake.auth ||
        !socket.handshake.auth.token
    ) {
        return next(new Error('authentication error bad headers')); //TODO SUPER ALERT ADMIN
    }
    const beartoken = socket.handshake.auth.token || '';
    if (!beartoken.startsWith(rawrrr)) {
        return next(new Error('authentication error bear')); //TODO SUPER ALERT ADMIN
    }

    const token = beartoken.substr(rawrrr.length);
    decodeJWT(token, Config.USER_SECRET)
        .then((decoded) => {
            UserController.getUserByAccountId(decoded)
                .then((userDoc) => {
                    socket.user = userDoc;
                    return next(null, userDoc);
                })
                .catch((err) => {
                    socket.user = null;
                    return next(null, null);
                });
        })
        .catch((err) => {
            console.log(err);
            return next(new Error('authentication error token'));
        });
};

const decodeJWT = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
