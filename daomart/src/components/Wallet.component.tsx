import {useGetBalance} from '../hooks/Balance';
import {minimizeAddress} from '../util/address';
import {getNetworkName} from '../util/network';

import MetamaskIcon from '../assets/images/metamask.png';
import {GitcoinContext} from '../store';
import React from 'react';
import Image from './Image.component';
import {useHistory} from 'react-router-dom';
import Web3 from 'web3';
import {useGetCandyBalance} from '../hooks/Candy.hook';
import {
    useGetTokenContract,
    useGetTokenContractMeta,
} from '../hooks/Contract.hook';
import CircularProgress from '@material-ui/core/CircularProgress';
import {ACTIONS} from '../store/actions';
declare const window: any;
const WalletComponent = ({}) => {
    const {state, dispatch} = React.useContext(GitcoinContext);
    const wallets = state.wallets;
    const balance = useGetBalance(wallets[0], state.provider);

    const router = useHistory();

    const [contractMeta, l1] = useGetTokenContractMeta(
        state.token,
        state.chain_id
    );
    const [contract, l2] = useGetTokenContract(contractMeta);

    const [cBalance, l3] = useGetCandyBalance(
        contract,
        state.wallets[0],
        state.candyBalanceTrigger
    );
    const candyBalanceLoading = l1 || l2 || l3;

    React.useEffect(() => {
        dispatch({type: ACTIONS.SET_CANDY_BALANCE, payload: cBalance});
    }, [cBalance]);

    const onMetamaskConnect = async (e) => {
        e.preventDefault();
        //@ts-ignore
        const permissions = await window.ethereum.request({
            method: 'wallet_requestPermissions',
            params: [
                {
                    eth_accounts: {},
                },
            ],
        });
        dispatch({type: ACTIONS.RESETAUTH});
    };

    const handleAccountsChanged = (accounts: string[]) => {
        let myweb3: any = new Web3(window.ethereum);

        dispatch({
            type: ACTIONS.SET_WALLETS,
            payload: accounts,
        });

        dispatch({
            type: ACTIONS.SET_PROVIDER,
            payload: myweb3.currentProvider,
        });
    };

    const handleChainChanged = (chainId: number) => {
        dispatch({
            type: 'SET_CHAIN_ID',
            payload: parseInt(chainId.toString(), 16).toString(),
        });
    };
    const _stup = async () => {
        if (!window.ethereum) {
            return;
        }
        let myweb3: any = new Web3(window.ethereum);
        const accounts = window.ethereum
            .request({
                method: 'eth_accounts',
            })
            .then(handleAccountsChanged)
            .catch((err: any) => console.error(err));

        window.ethereum.on('accountsChanged', handleAccountsChanged);

        window.ethereum.on('chainChanged', handleChainChanged);
        dispatch({
            type: 'SET_CHAIN_ID',
            payload: (await myweb3.eth.net.getId()).toString(),
        });
    };

    React.useEffect(() => {
        let myweb3: any = new Web3(window.ethereum);
        dispatch({
            type: ACTIONS.SET_PROVIDER,
            payload: myweb3.currentProvider,
        });
        _stup();

        return () => {
            if (window.ethereum.removeListener) {
                window.ethereum.removeListener(
                    'accountsChanged',
                    handleAccountsChanged
                );
                window.ethereum.removeListener(
                    'chainChanged',
                    handleChainChanged
                );
            }
        };
    }, []);

    React.useEffect(() => {
        requestSwitchNetwork();
    }, []);
    const requestSwitchNetwork = async () => {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{chainId: '0x' + (42).toString(16)}],
        });
    };
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                flex: 1,
            }}
        >
            <div>
                {' '}
                {getNetworkName(state.chain_id) != 'Kovan' ? (
                    <p style={{color: 'pink', margin: 0}}>
                        {'\n WRONG NETWORK! SWITCH TO KOVAN'}
                    </p>
                ) : (
                    ''
                )}
            </div>
            {state.wallets[0] ? (
                <div className="wallet-chip">
                    {candyBalanceLoading ? (
                        <CircularProgress size="mini" />
                    ) : (
                        <p>{`${
                            state.candyBalance != null
                                ? state.candyBalance
                                : '-null-'
                        } 🍬`}</p>
                    )}
                </div>
            ) : null}{' '}
            {state.wallets[0] ? (
                <div className="wallet-chip">
                    <p> {`${balance} Ξ`}</p>
                </div>
            ) : null}
            {state.wallets[0] ? (
                <div className="wallet-chip" onClick={onMetamaskConnect}>
                    <p> {minimizeAddress(state.wallets[0])}</p>
                </div>
            ) : (
                <div className="wallet-chip" onClick={onMetamaskConnect}>
                    <p> {'CONNECT'} </p>
                </div>
            )}
            <div className="wallet-chip">
                <p> {getNetworkName(state.chain_id)} </p>
            </div>
        </div>
    );
};

export default WalletComponent;
