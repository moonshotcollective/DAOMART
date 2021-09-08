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

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        fontSize: '0.75rem',
                        backgroundColor: 'white',
                        color: '#232323',

                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid black',
                        margin: '0 0.5rem',
                        padding: '0.75rem',
                    }}
                >
                    {candyBalanceLoading ? (
                        <CircularProgress />
                    ) : (
                        <div>{`${
                            state.candyBalance != null
                                ? state.candyBalance
                                : '-null-'
                        } 🍬`}</div>
                    )}
                </div>{' '}
                <div
                    style={{
                        fontSize: '0.75rem',
                        backgroundColor: 'white',
                        color: '#232323',

                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid black',
                        margin: '0 0.5rem',
                        padding: '0.75rem',
                    }}
                >
                    {state.wallets[0] ? `${balance} Ξ` : null}
                </div>
                {state.wallets[0] ? (
                    <div
                        style={{
                            margin: 0,
                            border: '2px solid white',
                            padding: 0,
                            backgroundColor: 'transparent',
                        }}
                        onClick={onMetamaskConnect}
                    >
                        <div className="signin-address">
                            <p> {minimizeAddress(state.wallets[0])}</p>
                        </div>
                    </div>
                ) : (
                    <div
                        style={{
                            border: '2px solid white',
                            backgroundColor: 'transparent',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontWeight: 'bold',
                            margin: '1rem 0',
                            padding: '0.5rem',
                        }}
                        onClick={onMetamaskConnect}
                        className="btn"
                    >
                        {'CONNECT'}
                        <Image
                            alt="wallet"
                            src={MetamaskIcon}
                            height="32"
                            width="32"
                        />
                    </div>
                )}
                <div
                    style={{
                        fontSize: '0.75rem',
                        backgroundColor: 'white',
                        color: '#232323',

                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        border: '1px solid black',
                        margin: '0 0.5rem',
                        padding: '0.75rem',
                    }}
                >
                    {getNetworkName(state.chain_id)}
                    {getNetworkName(state.chain_id) != 'Kovan' ? (
                        <p style={{color: 'crimson'}}>
                            {'\n WRONG NETWORK! SWITCH TO KOVAN'}
                        </p>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
};

export default WalletComponent;
