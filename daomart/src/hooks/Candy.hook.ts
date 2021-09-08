import {ethers} from 'ethers';
import React from 'react';

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
