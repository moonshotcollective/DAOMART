const QuadraticLoot = require('./quadratic-loot.model');

const getQuadraticLootContracts = ({chain}) => {
    return new Promise((resolve, reject) => {
        QuadraticLoot.find({chain: chain})
            .sort({created_at: -1})
            .lean()
            .then((ddocs) => {
                const contracts = parseContracts(ddocs);
                resolve(contracts);
            })
            .catch(reject);
    });
};

const newQuadraticLootContract = ({chain, address}) => {
    return new Promise((resolve, reject) => {
        const newQuadraticLoot = new QuadraticLoot({
            chain: chain,
            address: address,
        });
        newQuadraticLoot
            .save()
            .then((newDoc) => {
                const contract = parseContracts([newDoc.toObject()])[0];
                resolve(contract);
            })
            .catch(reject);
    });
};

module.exports = {
    getQuadraticLootContracts,
    newQuadraticLootContract,
};

const parseContracts = (ddocs) => {
    return ddocs.map((d) => ({
        chain: d.chain,
        address: d.address,
        name: d.name,
    }));
};
