const User = require('./user.model');
const Account = require('./account.model');
const UserBadge = require('./user-badge.model');
const {v4: uuidv4} = require('uuid');
const jwt = require('jsonwebtoken');
const Config = require('../../../config');
const {
    ecrecover,
    fromRpcSig,
    pubToAddress,
    bufferToHex,
    keccak256,
} = require('ethereumjs-util'); //TODO replace with ethers
const MIN_LENGTH_NAME_FAILED = 'Nickname should be atleast 4 letters';
const getNonceForAddress = (address) => {
    return new Promise((resolve, reject) => {
        __getAccount__(address).then(resolve).catch(reject);
    });
};

const Authenticate = ({signedMessage, nonce, name} = {}) => {
    return new Promise((resolve, reject) => {
        if (!signedMessage) {
            return reject(MIN_LENGTH_NAME_FAILED + ' ?E?');
        }
        __Auth__(signedMessage, nonce, name).then(resolve).catch(reject);
    });
};

const getUsersByQuery = ({keyword, name, address, badge} = {}) => {
    return new Promise((resolve, reject) => {
        User.find({
            ...(name ? {name: {$regex: `/${name}/`, $options: 'i'}} : {}),
            ...(address
                ? {address: {$regex: `/${address}/`, $options: 'i'}}
                : {}),
            ...(badge ? {badge: badge} : {}),
        })
            .then((ddocs) => {
                resolve(parseUsers(ddocs));
            })
            .catch(reject);
    });
};

const getById = ({uid}) => {
    return new Promise((resolve, reject) => {
        User.findOne({_id: uid})
            .then((doc) => {
                if (!doc) {
                    reject('NOT_FOUND');
                } else {
                    resolve(parseUsers([doc])[0]);
                }
            })
            .catch(reject);
    });
};
const __getUserByAccountId__ = ({account_id}) => {
    return new Promise((resolve, reject) => {
        Account.findOne({_id: account_id})
            .then((doc) => {
                if (!doc) {
                    reject('NOT_FOUND');
                } else {
                    __findUserByQuery__({account: doc._id})
                        .then((udoc) => {
                            resolve(parseUsers([udoc])[0]);
                        })
                        .catch(reject);
                }
            })
            .catch(reject);
    });
};

const IsSignedUp = ({address}) => {
    return new Promise((resolve, reject) => {
        if (!address) return resolve({address: address, exists: false});
        User.findOne({address: address})
            .then((doc) => {
                if (!doc) {
                    resolve({address: address, exists: false});
                } else {
                    resolve({address: address, exists: true});
                }
            })
            .catch(reject);
    });
};
const getUserById = ({user_id}) => {
    return __getUserById__(user_id);
};

const getUsersById = (list = []) => {
    const l = [...new Set(list.map((i) => i.user_id.toString()))];
    return Promise.all(l.map((u) => __getUserById__(u)));
};

module.exports = {
    getNonceForAddress,
    Authenticate,
    getUsersByQuery,
    getById,
    __getUserByAccountId__,
    IsSignedUp,
    getUserById,
    getUsersById,
};
const __findUserByQuery__ = ({account}) => {
    return new Promise((resolve, reject) => {
        if (!account) {
            return reject('NULL INPU');
        }
        User.findOne({account: account})
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
const __getAccount__ = (address) => {
    return new Promise((resolve, reject) => {
        if (
            address &&
            address.toString().length === 42 &&
            address.toString().startsWith('0x')
        ) {
            Account.findOne({address: address})
                .then((fdoc) => {
                    if (!fdoc) {
                        const newAccount = new Account({
                            address: address.toString().toLowerCase(),
                            nonce: 'karbafoo-' + uuidv4(),
                        });
                        newAccount.save((err, doc) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(doc.nonce);
                            }
                        });
                    } else {
                        fdoc.set({
                            nonce: 'karbafoo-' + uuidv4(),
                        });
                        fdoc.save((err, doc) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(doc.nonce);
                            }
                        });
                    }
                })
                .catch(reject);
        } else {
            reject('ERROR INVALID INPUT');
        }
    });
};

const __getAccountByNonce__ = (nonce) => {
    return new Promise((resolve, reject) => {
        if (nonce && nonce.toString().length > 0) {
            Account.findOne({nonce: nonce})
                .then((doc) => {
                    if (!doc) {
                        reject('NOT_FOUND');
                    } else {
                        resolve(doc);
                    }
                })
                .catch(reject);
        } else {
            reject('ERROR INVALID INPUT');
        }
    });
};
const __Auth__ = (signedMessage, nonce, name) => {
    return new Promise((resolve, reject) => {
        __getAccountByNonce__(nonce)
            .then((accountDoc) => {
                const prefix = Buffer.from('\x19Ethereum Signed Message:\n');
                const {v, r, s} = fromRpcSig(signedMessage);
                const msg = Buffer.from(nonce);
                const prefixedMsg = keccak256(
                    Buffer.concat([
                        prefix,
                        new Buffer.from(String(msg.length)),
                        msg,
                    ])
                );
                const pubKey = ecrecover(prefixedMsg, v, r, s);
                const recAddr = bufferToHex(pubToAddress(pubKey));

                if (recAddr === accountDoc.address) {
                    __getUser__(accountDoc._id, accountDoc.address, name)
                        .then((userDoc) => {
                            jwt.sign(
                                {account_id: accountDoc._id},
                                Config.USER_SECRET,
                                {
                                    algorithm: 'HS256',
                                },
                                (err, token) => {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve({
                                            token: token,
                                            profile: {
                                                name: userDoc.name,
                                                user_id: userDoc._id.toString(),
                                                address: accountDoc.address,
                                            },
                                        });
                                    }
                                }
                            );
                        })
                        .catch((err) => {
                            reject(err);
                        });
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const __getUser__ = (account_id, address, name) => {
    return new Promise((resolve, reject) => {
        User.findOne({account: account_id})
            .then((userDoc) => {
                if (!userDoc) {
                    const n = name.toString().trim().length;
                    if (!n || n.length < 4) {
                        return reject(MIN_LENGTH_NAME_FAILED);
                    }
                    const newUser = new User({
                        account: account_id,
                        address: address.toString().toLowerCase(),
                        name: name,
                    });
                    newUser.save((err, doc) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(doc);
                        }
                    });
                } else {
                    resolve(userDoc);
                }
            })
            .catch(reject);
    });
};

const __getUserById__ = (id) => {
    if (!id) return reject('NOT_FOUND');
    return new Promise((resolve, reject) => {
        User.findById(id)
            .then((userDoc) => {
                if (!userDoc) {
                    reject('NOT_FOUND');
                } else {
                    resolve(userDoc);
                }
            })
            .catch(reject);
    });
};

// const adminCheck = () => {
//     User.find({})
//         .then((userDoc) => {
//             if (!userDoc || !userDoc.length) {
//                 const addr = '0x9B00B2A3514CC05Ea9957ad5e4D279D724a81Afb';
//                 const nonce = 'karbafoo-6f4e8f96-70c1-4a0d-8cfb-84a7e6c64c7f';
//                 __getAccount__(addr)
//                     .then((nonce) => {
//                         Account.findOne({address: address})
//                             .then((accountDoc) => {
//                                 const newUser = new User({
//                                     account: accountDoc._id,
//                                     address: addr,
//                                     name: 'Farhad',
//                                 });
//                                 newUser.save((err, doc) => {
//                                     if (err) {
//                                         console.log(err);
//                                     } else {
//                                         console.log(doc);
//                                     }
//                                 });
//                             })
//                             .catch(console.log);
//                     })
//                     .catch(console.log);
//             }
//         })
//         .catch(console.log);
// };

// adminCheck();
const parseUsers = (ddocs) => {
    return ddocs.map((d) => ({
        user_id: d._id,
        badge: d.badge,
        email: d.email,
        address: d.address,
        name: d.name,
        avatar: d.avatar,
        status: d.status,
    }));
};
