const Order = require('./order.model');
const {parseProducts} = require('../product/product.controller');
const newOrder = ({type, item, user}) => {
    return new Promise((resolve, reject) => {
        console.log('item', item);
        const newOrder = new Order({
            type: type || 'Full',
            item: item,
            user: user,
            status: 'pending',
        });
        newOrder
            .save()
            .then((newDoc) => {
                console.log('newDoc', newDoc);
                resolve(parseOrders([newDoc.toObject()])[0]);
            })
            .catch(reject);
    });
};
const getOrdersByQuery = ({type, item, user}) => {
    return __getOrderByQuery__({type, item, user});
};
const getById = ({oid}) => {
    if (!oid) return Promise.reject('NOT_FOUND');
    return __getOrderById__({id: oid});
};
module.exports = {
    newOrder,
    getOrdersByQuery,
    getById,
};

const __getOrderByQuery__ = ({user, item, type} = {}) => {
    return new Promise((resolve, reject) => {
        Order.find({
            ...(type ? {type: type} : {}),
            ...(user ? {user: user} : {}),
            ...(item ? {item: item} : {}),
        })
            .sort({created_at: -1})
            .populate([
                {
                    path: 'item',
                    model: 'Product',
                },
                {
                    path: 'user',
                },
            ])
            .lean()
            .then((ddocs) => {
                resolve(parseOrders(ddocs));
            })
            .catch(reject);
    });
};

const __getOrderById__ = ({id} = {}) => {
    return new Promise((resolve, reject) => {
        Order.findById(id)
            .sort({created_at: -1})
            .populate([
                {
                    path: 'item',
                    model: 'Product',
                },
                {
                    path: 'user',
                },
            ])
            .lean()
            .then((ddoc) => {
                resolve(parseOrders([ddoc])[0]);
            })
            .catch(reject);
    });
};

const parseOrders = (ddocs) => {
    return ddocs.map((d) => ({
        order_id: d._id,
        type: d.type,
        user: d.user,
        item: d.item ? parseProducts([d.item])[0] : null,
        status: d.status,
    }));
};
