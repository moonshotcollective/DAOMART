import {BaseProvider} from '@ethersproject/providers';
import {Contract, ethers} from 'ethers';
import React from 'react';
import Web3 from 'web3';
declare const window: any;
const useGetBalance = (addr: string, provider: BaseProvider) => {
    const [balance, setbalance] = React.useState('');
    const [loading, setloading] = React.useState(false);
    React.useMemo(async () => {
        if (addr && provider) {
            try {
                if (!provider || !provider.getBalance) {
                    return;
                }
                setloading(true);
                let a = ethers.utils.formatEther(
                    (await provider.getBalance(addr)).toString()
                );
                let b = parseFloat(a.toString()).toFixed(2);
                setbalance(b);
                setloading(false);
            } catch (err) {
                console.log('err', err);
                setloading(false);
            }
        } else {
            setbalance('');
        }
    }, [addr, provider]);
    return balance;
};

let blockNumberInterval: any = null;
const useGetBlockNumber = (): [string, boolean] => {
    const [blockNumber, setblockNumber] = React.useState('');
    const [loading, setloading] = React.useState(false);
    React.useMemo(async () => {
        try {
            setloading(true);
            let myweb3: any = new Web3(window.ethereum);
            const blockNO = await myweb3.eth.getBlockNumber();
            setblockNumber(blockNO);
            setloading(false);

            blockNumberInterval = setInterval(async () => {
                const blockNO = await myweb3.eth.getBlockNumber();
                setblockNumber(blockNO);
            }, 10 * 1000);
        } catch (err) {
            console.log('err', err);
            setloading(false);
        }

        return () => {
            clearInterval(blockNumberInterval);
        };
    }, []);
    return [blockNumber, loading];
};

export {useGetBalance, useGetBlockNumber};
