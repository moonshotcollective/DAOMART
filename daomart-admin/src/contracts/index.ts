import {BigNumber, ethers} from 'ethers';

declare const window: any;
const deployProductContract = (
    chainId: any,
    options: any[]
): Promise<string> => {
    console.log(`redeploying contracts on ${chainId}`);
    return new Promise(async (resolve, reject) => {
        try {
            const provider = new ethers.providers.Web3Provider(
                window.ethereum,
                'any' // getNetworkName(chainId).toLocaleLowerCase()
            );

            let metadata: any = {};

            try {
                metadata = require(`./daomart.json`);
            } catch (e) {
                console.log(e);
            }
            console.log('options', options);
            console.log(`Deploying ${'NEW DAOMART PRODUCT '} : \n ${options}`);

            let factory = new ethers.ContractFactory(
                metadata.abi,
                metadata.data.bytecode.object,
                provider.getSigner()
            );

            const contract = await factory.deploy(...options);
            console.log('Contract Address: ', contract.address);
            await contract.deployed();
            console.log('Contract Deployed: ', contract.deployTransaction);
            if (contract.deployTransaction) {
                console.log(
                    `gas limit ${
                        BigNumber.from(
                            contract.deployTransaction.gasLimit
                        ).toNumber() / 1e9
                    } at gas price ${
                        BigNumber.from(
                            contract.deployTransaction.gasPrice
                        ).toNumber() / 1e9
                    }`
                );
            }

            resolve(contract.address);
        } catch (e: any) {
            if (e && e['reason']) {
                reject(e['reason']);
            } else if (e && e['message']) {
                reject(e['message']);
            } else {
                console.log(e);
                reject('ERROR [!]');
            }
        }
    });
};
const deployCandyContract = (chainId: any): Promise<string> => {
    console.log(`redeploying contracts on ${chainId}`);
    return new Promise(async (resolve, reject) => {
        try {
            const provider = new ethers.providers.Web3Provider(
                window.ethereum,
                'any' // getNetworkName(chainId).toLocaleLowerCase()
            );

            let metadata: any = {};

            try {
                metadata = require(`./candy.json`);
            } catch (e) {
                console.log(e);
            }

            console.log(`Deploying ${'Candy'}`);

            let factory = new ethers.ContractFactory(
                metadata.abi,
                metadata.data.bytecode.object,
                provider.getSigner()
            );

            const contract = await factory.deploy('Candy', '🍬');
            console.log('Contract Address: ', contract.address);
            await contract.deployed();
            console.log('Contract Deployed: ', contract.deployTransaction);
            if (contract.deployTransaction) {
                console.log(
                    `gas limit ${
                        BigNumber.from(
                            contract.deployTransaction.gasLimit
                        ).toNumber() / 1e9
                    } at gas price ${
                        BigNumber.from(
                            contract.deployTransaction.gasPrice
                        ).toNumber() / 1e9
                    }`
                );
            }

            resolve(contract.address);
        } catch (e: any) {
            if (e && e['reason']) {
                reject(e['reason']);
            } else if (e && e['message']) {
                reject(e['message']);
            } else {
                console.log(e);
                reject('ERROR [!]');
            }
        }
    });
};

const getProductContractMeta = () => {
    let metadata: any = {};

    try {
        metadata = require(`./daomart.json`);
    } catch (e) {
        console.log(e);
    }
    return metadata;
};
const getCandyContractMeta = () => {
    let metadata: any = {};

    try {
        metadata = require(`./candy.json`);
    } catch (e) {
        console.log(e);
    }
    return metadata;
};
export {
    deployProductContract,
    deployCandyContract,
    getProductContractMeta,
    getCandyContractMeta,
};
