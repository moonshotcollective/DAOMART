import {ethers} from 'ethers';
import React from 'react';
import Web3 from 'web3';
import {getCandyContractMeta} from '../contracts';
import {GetCandyContractMetadata} from '../network/api';

export const useGetTokenContractMeta = (
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
            GetCandyContractMetadata(token, {chain: chain})
                .then((result) => {
                    console.log('result', result);
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
                    console.log('');
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
export const useGetCandyContract = (address?: string) => {
    const [contract, setcontract] = React.useState<any>(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setcontract(null);

        if (!address) {
            return;
        }

        try {
            const metadata = await getCandyContractMeta();
            let myweb3: any = new Web3(window.ethereum);
            const contract = new myweb3.eth.Contract(metadata.abi, address);
            setcontract(contract);
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            setcontract(null);
        }
    }, [address]);
    return [contract, loading, err];
};
const useGetCandyAllowance = (
    contract?: any,
    owner?: string,
    spender?: string
): [number | null, boolean, any] => {
    const [allowance, setallowance] = React.useState<number | null>(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>(null);
    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setallowance(null);
        if (!contract || !owner || !spender) {
            return;
        }
        try {
            setloading(true);
            contract.methods
                .allowance(owner, spender)
                .call()
                .then((result) => {
                    setallowance(Number(ethers.utils.formatEther(result)));
                    setloading(false);
                    seterr(null);
                })
                .catch((err) => {
                    console.log('err', err);
                    setloading(false);
                    seterr(err);
                    setallowance(null);
                });
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            setallowance(null);
        }
    }, [contract, spender, owner]);
    return [allowance, loading, err];
};
const useGetCandyBalance = (
    contract?: any,
    owner?: string,
    trigger = false
): [number | null, boolean, any] => {
    const [balance, setbalance] = React.useState<number | null>(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>(null);
    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setbalance(null);
        if (!contract || !owner) {
            return;
        }

        try {
            setloading(true);
            contract.methods
                .balanceOf(owner)
                .call()
                .then((result) => {
                    setbalance(Number(ethers.utils.formatEther(result)));
                    setloading(false);
                    seterr(null);
                })
                .catch((err) => {
                    console.log('err', err);
                    setloading(false);
                    seterr(err);
                    setbalance(null);
                });
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            setbalance(null);
        }
    }, [contract, owner, trigger]);
    return [balance, loading, err];
};

export {useGetCandyAllowance, useGetCandyBalance};
