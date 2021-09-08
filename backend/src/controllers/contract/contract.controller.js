const ProductContract = require('./product-contract.model');
const CandyContract = require('./candy-contract.model');

const getTokenContracts = ({chain}) => {
    return new Promise((resolve, reject) => {
        CandyContract.find({chain: chain})
            .sort({created_at: -1})
            .lean()
            .then((ddocs) => {
                const contracts = parseCandyContracts(ddocs);
                resolve(contracts);
            })
            .catch(reject);
    });
};

const onNewCandyContract = ({chain, address}) => {
    return new Promise((resolve, reject) => {
        const newCandyContract = new CandyContract({
            chain: chain,
            address: address,
        });
        newCandyContract
            .save()
            .then((newDoc) => {
                const contract = parseCandyContracts([newDoc.toObject()])[0];
                resolve(contract);
            })
            .catch(reject);
    });
};

////////////// Product
const getProductContracts = ({chain, type}) => {
    return new Promise((resolve, reject) => {
        ProductContract.find({chain: chain, ...(type ? {type: type} : {})})
            .sort({created_at: -1})
            .lean()
            .then((ddocs) => {
                const contracts = parseProductContracts(ddocs);
                resolve(contracts);
            })
            .catch(reject);
    });
};
const onNewProductContract = ({chain, type, address, name, productCount}) => {
    return new Promise((resolve, reject) => {
        const newContract = new ProductContract({
            chain: chain,
            type: type || 'NFT',
            address: address,
            name: name,
            productCount: productCount,
        });
        newContract
            .save()
            .then((newDoc) => {
                resolve(newDoc.toObject());
            })
            .catch(reject);
    });
};

module.exports = {
    getTokenContracts,
    onNewCandyContract,
    // PRODUCT CONTRACTS
    getProductContracts,
    onNewProductContract,
};

const parseProductContracts = (ddocs) => {
    return ddocs.map((d) => ({
        type: d.type,
        chain: d.chain,
        address: d.address,
        name: d.name,
        productCount: d.productCount,
    }));
};
const parseCandyContracts = (ddocs) => {
    return ddocs.map((d) => ({
        chain: d.chain,
        address: d.address,
        name: d.name,
    }));
};
