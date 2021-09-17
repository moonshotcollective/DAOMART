import {ethers} from 'ethers';
import React from 'react';
import Web3 from 'web3';
const useGetAllTokensMinted = (contractMeta?: any) => {
    const [tokens, settokens] = React.useState<any[] | null>(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>(null);
    React.useMemo(async () => {
        if (!contractMeta) {
            return;
        }
        setloading(false);
        seterr(null);
        settokens(null);

        try {
            const TOPICS = ['Transfer(address,address,uint256)'];
            setloading(true);
            let myweb3: any = new Web3(window.ethereum);
            const options = {
                address: contractMeta.address,
                fromBlock: 1,
                toBlock: 'latest',
                topics: [
                    Web3.utils.keccak256(TOPICS[0]),
                    ethers.constants.HashZero,
                ],
            };
            const logs = await myweb3.eth.getPastLogs(options);
            settokens(
                logs.map((l) => myweb3.utils.hexToNumberString(l.topics[3]))
            );
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            settokens(null);
        }
    }, [contractMeta]);
    return [tokens, loading, err];
};
const useGetTokensURIs = (contract?: any, ids?: string[]) => {
    const [tokens, settokens] = React.useState<any[] | null>(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>(null);
    React.useMemo(async () => {
        if (!contract || !ids || !ids.length) {
            return;
        }
        setloading(false);
        seterr(null);
        settokens(null);

        try {
            Promise.all(ids.map((id) => contract.methods.tokenURI(id).call()))
                .then((uris) => {
                    settokens(uris.map((uri, i) => ({id: ids[i], image: uri})));
                })
                .catch((err) => {
                    console.log('err', err);
                    setloading(false);
                    seterr(err);
                    settokens(null);
                });
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            settokens(null);
        }
    }, [contract, ids]);
    return [tokens, loading, err];
};
export {useGetAllTokensMinted, useGetTokensURIs};
