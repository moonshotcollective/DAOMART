import React from 'react';
import {
    getProductContractMeta,
    getCandyContractMeta,
    getQuadtraicLootMeta,
} from '../contracts';
import {GetCandyContract, GetQuadraticLootContract} from '../network/api';
import Web3 from 'web3';
declare const window: any;
const useGetProductContract = (address?: string): [any, boolean, any] => {
    const [contract, setcontract] = React.useState<any>([]);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        if (!address) {
            return;
        }

        try {
            setloading(true);
            const metadata = await getProductContractMeta();
            let myweb3: any = new Web3(window.ethereum);
            const contract = new myweb3.eth.Contract(metadata.abi, address);
            setcontract(contract);
        } catch (err) {
            setloading(false);
            seterr(err);
            setcontract(null);
        }
    }, [address]);
    return [contract, loading, err];
};
const useGetTokenContractMeta = (
    token?: string,
    chain?: string,
    trigger = false
): [any, boolean, any] => {
    const [meta, setmeta] = React.useState<any>(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setmeta(null);
        if (!token) {
            return;
        }
        if (!chain) {
            return;
        }
        try {
            setloading(true);
            GetCandyContract(token, {chain: chain})
                .then((result) => {
                    if (result.data.success) {
                        setmeta(result.data.data);
                        setloading(false);
                        seterr(null);
                    } else {
                        setloading(false);
                        seterr('Uknow Error');
                        setmeta(null);
                    }
                })
                .catch((err) => {
                    setloading(false);
                    seterr(err);
                    setmeta(null);
                });
        } catch (err) {
            setloading(false);
            seterr(err);
            setmeta(null);
        }
    }, [token, chain, trigger]);
    return [meta, loading, err];
};
const useGetQuadraticLootContractMeta = (
    token?: string,
    chain?: string,
    trigger = false
): [any, boolean, any] => {
    const [meta, setmeta] = React.useState<any>(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setmeta(null);
        if (!token) {
            return;
        }
        if (!chain) {
            return;
        }
        try {
            setloading(true);
            GetQuadraticLootContract(token, {chain: chain})
                .then((result) => {
                    if (result.data.success) {
                        setmeta(result.data.data);
                        setloading(false);
                        seterr(null);
                    } else {
                        setloading(false);
                        seterr('Uknow Error');
                        setmeta(null);
                    }
                })
                .catch((err) => {
                    setloading(false);
                    seterr(err);
                    setmeta(null);
                });
        } catch (err) {
            setloading(false);
            seterr(err);
            setmeta(null);
        }
    }, [token, chain, trigger]);
    return [meta, loading, err];
};
const useGetTokenContract = (meta?: any): [any, boolean, any] => {
    const [contract, setcontract] = React.useState<any>(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        if (!meta) {
            return;
        }
        try {
            setloading(true);
            const metadata = await getCandyContractMeta();
            let myweb3: any = new Web3(window.ethereum);
            const contract = new myweb3.eth.Contract(
                metadata.abi,
                meta.address
            );
            setcontract(contract);
            setloading(false);
        } catch (err) {
            setloading(false);
            seterr(err);
            setcontract(null);
        }
    }, [meta]);
    return [contract, loading, err];
};
const useGetQuadraticLootContract = (meta?: any): [any, boolean, any] => {
    const [contract, setcontract] = React.useState<any>(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        if (!meta) {
            return;
        }
        try {
            setloading(true);
            const metadata = await getQuadtraicLootMeta();
            let myweb3: any = new Web3(window.ethereum);
            const contract = new myweb3.eth.Contract(
                metadata.abi,
                meta.address
            );
            setcontract(contract);
            setloading(false);
        } catch (err) {
            setloading(false);
            seterr(err);
            setcontract(null);
        }
    }, [meta]);
    return [contract, loading, err];
};

export {
    useGetProductContract,
    useGetTokenContractMeta,
    useGetQuadraticLootContractMeta,
    useGetQuadraticLootContract,
    useGetTokenContract,
};
