const jwt = require('jsonwebtoken');
const Config = require('./config');
const UserController = require('./src/controllers/user/user.controller');
const {Server} = require('socket.io');

let productLobby = {};
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

        socket.on('JOIN_PRODUCT_ROOM', ({pid}) => {
            if (pid) {
                productLobby[pid] = (productLobby[pid] || 0) + 1;
            }
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

const getLobby = () => {
    const arr = [];
    for (const [_, socket] of io.of('/').sockets) {
        console.log('socket.user', socket.user);
        arr.push(socket.user);
    }

    return arr;
};

const getProductLobby = (d) => {
    console.log('d', d);
    return [];
};
module.exports = {
    Initiate,
    getLobby,
    getProductLobby,
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
            UserController.__getUserByAccountId__(decoded)
                .then((userDoc) => {
                    socket.user = userDoc;
                    return next(null, userDoc);
                })
                .catch((err) => {
                    console.log('err', err);
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
