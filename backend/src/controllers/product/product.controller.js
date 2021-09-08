const Product = require('./product.model');

const getProducts = () => {
    return __getProuctByQuery__();
};
const makeNewProduct = ({
    type,
    contract,
    category,
    code,
    price,
    name,
    description,
    avatar,
    tags,
}) => {
    return new Promise((resolve, reject) => {
        const newProduct = new Product({
            type: type || 'crypto',
            status: 'new',
            contract: contract,
            category: category,
            code: code,
            name: name,
            description: description,
            avatar: avatar,
            price: price,
            tags: tags,
        });
        newProduct
            .save()
            .then((newDoc) => {
                resolve(newDoc.toObject());
            })
            .catch(reject);
    });
};

const getProductCountByCategory = ({cid}) => {
    if (!cid) return Promise.resolve([]);
    return __getProuctByQuery__({category: cid});
};
const getById = ({pid}) => {
    if (!pid) return Promise.reject('NOT_FOUND');
    return __getProuctById__({id: pid});
};

const parseProducts = (ddocs) => {
    return ddocs.map((d) => ({
        product_id: d._id,
        category: d.category ? d.category.name : 'NO_CATEGORY',
        type: d.category ? d.category.type : 'NO_TYPE',
        code: d.code || d._id,
        name: d.name,
        price: d.price,
        description: d.description,
        avatar: d.avatar,
        tags: d.tags,
        contract: d.contract,
    }));
};

module.exports = {
    getProducts,
    makeNewProduct,
    getProductCountByCategory,
    getById,
    parseProducts,
};
const __getProuctByQuery__ = ({category, contract, name} = {}) => {
    return new Promise((resolve, reject) => {
        Product.find({
            ...(category ? {category: category} : {}),
            ...(contract ? {contract: contract} : {}),
            ...(name ? {name: {$regex: `/${name}/`, $options: 'i'}} : {}),
        })
            .sort({created_at: -1})
            .populate({
                path: 'category',
            })
            .lean()
            .then((ddocs) => {
                resolve(parseProducts(ddocs));
            })
            .catch(reject);
    });
};
const __getProuctById__ = ({id} = {}) => {
    return new Promise((resolve, reject) => {
        Product.findById(id)
            .sort({created_at: -1})
            .populate({
                path: 'category',
            })
            .lean()
            .then((ddoc) => {
                resolve(parseProducts([ddoc])[0]);
            })
            .catch(reject);
    });
};
