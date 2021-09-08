const getNetworkName = (id?: string) => {
    switch (id) {
        case '1':
            return 'Mainnet';
        case '5':
            return 'Goerli';
        case '3':
            return 'Ropsten';
        case '4':
            return 'Rinkeby';
        case '42':
            return 'Kovan';
        default:
            return id || 'UNDEFINED';
    }
};

const getNetworks = () => {
    return [
        {
            name: 'Mainnet',
            chain: '1',
        },
        {
            name: 'Goerli',
            chain: '5',
        },
        {
            name: 'Ropsten',
            chain: '3',
        },
        {
            name: 'Rinkeby',
            chain: '4',
        },
        {
            name: 'Kovan',
            chain: '42',
        },
    ];
};
const getNetworksOptions = () => {
    return getNetworks().map((n) => ({
        key: n.chain,
        value: n.chain,
        text: n.name,
    }));
};

export {getNetworkName, getNetworks, getNetworksOptions};
