const ProductCategory = require('./product-category.model');
const Product = require('./product.model');

const getCategories = () => {
    return new Promise((resolve, reject) => {
        ProductCategory.find({})
            .sort({created_at: -1})
            .lean()
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

module.exports = {
    getCategories,
    makeNewCategory,
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
