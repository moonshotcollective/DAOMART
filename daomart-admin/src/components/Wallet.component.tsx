import {useGetBalance} from '../hooks/Balance';
import {minimizeAddress} from '../util/address';
import {getNetworkName} from '../util/network';
import MetamaskIcon from '../assets/images/metamask.png';
import {GitcoinContext} from '../store';
import {Image} from './Image.component';
import React from 'react';

const WalletComponent = ({}) => {
    const {state, dispatch} = React.useContext(GitcoinContext);
    const wallets = state.wallets;
    const balance = useGetBalance(wallets[0], state.provider);
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
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}
            className="f"
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
                            <span>
                                {state.wallets[0] ? `${balance} Ξ` : null}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div
                        style={{
                            padding: 0,
                            border: '2px solid white',
                            backgroundColor: 'transparent',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontWeight: 'bold',
                            margin: '1rem 0',
                        }}
                        onClick={onMetamaskConnect}
                        className="btn"
                    >
                        {'CONNECT'}{' '}
                        <Image
                            alt="wallet"
                            src={MetamaskIcon}
                            height="32"
                            width="32"
                        />
                    </div>
                )}

                {/* <div
                    style={{
                        fontSize: '0.75rem',
                    }}
                >
                    <p style={{margin: '0 1rem'}}>
                        {getNetworkName(state.chain_id)}
                    </p>
                </div> */}
            </div>
        </div>
    );
};

export default WalletComponent;
