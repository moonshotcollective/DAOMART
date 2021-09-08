import React from 'react';
import Web3 from 'web3';
import {getProductContractMeta} from '../contracts';
declare const window: any;
const useGetProductContractItems = (
    address?: string
): [any[], boolean, any] => {
    const [contract, setcontract] = React.useState<any[]>([]);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        if (!address) {
            return;
        }
        setloading(false);
        seterr(null);
        setcontract([]);

        try {
            const metadata = await getProductContractMeta();
            let myweb3: any = new Web3(window.ethereum);
            const contract = new myweb3.eth.Contract(metadata.abi, address);

            console.log('contract', contract);

            contract.methods
                .getAllProducts()
                .call()
                .then((result) => {
                    console.log('result', result);
                    setcontract(result);
                    setloading(false);
                    seterr(null);
                })
                .catch((err) => {
                    console.log('err', err);
                    setloading(false);
                    seterr(err);
                    setcontract([]);
                });
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            setcontract([]);
        }
    }, [address]);
    return [contract, loading, err];
};

export {useGetProductContractItems};
