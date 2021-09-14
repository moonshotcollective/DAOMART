const ProductCategory = require('./product-category.model');

const getCategories = ({keyword, skip, limit} = {}) => {
    return new Promise((resolve, reject) => {
        ProductCategory.find({
            $or: [
                keyword ? {name: new RegExp(keyword, 'i')} : {},
                keyword ? {description: new RegExp(keyword, 'i')} : {},
                keyword ? {tags: {$in: [new RegExp(keyword, 'i')]}} : {},
            ],
        })
            .sort({created_at: -1})
            .lean()
            .skip(skip || 0)
            .limit(limit || 100)
            .then((ddocs) => {
                resolve(parseProductCategories(ddocs));
            })
            .catch(reject);
    });
};
const makeNewCategory = ({type, name, description, avatar, tags}) => {
    return new Promise((resolve, reject) => {
        const newProductCategory = new ProductCategory({
            type: type,
            name: name,
            description: description,
            avatar: avatar,
            tags: tags,
        });
        newProductCategory
            .save()
            .then((newDoc) => {
                resolve(newDoc.toObject());
            })
            .catch(reject);
    });
};
const getById = ({cid}) => {
    if (!cid) return Promise.reject('NOT_FOUND');
    return __getCategoryById__({id: cid});
};
module.exports = {
    getCategories,
    makeNewCategory,
    getById,
};

const __getCategoryById__ = ({id} = {}) => {
    return new Promise((resolve, reject) => {
        ProductCategory.findById(id)
            .sort({created_at: -1})
            .lean()
            .then((ddoc) => {
                resolve(parseProductCategories([ddoc])[0]);
            })
            .catch(reject);
    });
};
const parseProductCategories = (ddocs) => {
    return ddocs.map((d) => ({
        category_id: d._id,
        type: d.type,
        name: d.name,
        description: d.description,
        avatar: d.avatar,
        tags: d.tags,
    }));
};
