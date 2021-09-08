import React from 'react';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import {Button, Divider} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import {GitcoinContext} from '../store';
import WalletComponent from './Wallet.component';
import Web3 from 'web3';
import {isAddress} from 'ethers/lib/utils';
import {CheckAuth, GetNonce, Login} from '../network/auth';
import {Chip} from '@material-ui/core';
import {ACTIONS} from '../store/actions';
declare const window: any;
function SignIncomponent() {
    const {state, dispatch} = React.useContext(GitcoinContext);
    const [err, setErr] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [alreadySignedUp, setAlreadySignedUp] = React.useState(true);
    const [login, setLogin] = React.useState({
        address: '',
        name: '',
    });

    React.useEffect(() => {
        setLogin({...login, address: state.wallets[0]});
        try {
            setAlreadySignedUp(true);
            if (isAddress(state.wallets[0])) {
                CheckAuth(state.wallets[0])
                    .then((result) => {
                        if (
                            result &&
                            result.data.success &&
                            result.data.data.address == state.wallets[0] &&
                            result.data.data.exists
                        ) {
                            setAlreadySignedUp(true);
                        } else {
                            setAlreadySignedUp(false);
                        }
                    })
                    .catch((err) => {
                        setAlreadySignedUp(true);
                        console.log(err);
                    });
            } else {
                setAlreadySignedUp(true);
            }
        } catch (err) {
            setAlreadySignedUp(true);
            console.log(err);
        }
    }, [state.wallets]);

    const onGetNonce = () => {
        if (login.address && isAddress(login.address)) {
            if (
                !alreadySignedUp &&
                (!login.name || login.name.toString().trim().length < 4)
            ) {
                setErr('Nickname must be alteast 4 letters');
                return;
            }
            setErr('');
            setLoading(true);
            GetNonce(login.address)
                .then((res) => {
                    if (res && res.data && res.data.success) {
                        let nonce = res.data.data.nonce;
                        let myweb3: any = new Web3(window.ethereum);

                        myweb3.eth.personal
                            .sign(nonce, state.wallets[state.wallet])
                            .then((signedMessage) => {
                                Login(
                                    signedMessage,
                                    nonce,
                                    state.wallets[state.wallet],
                                    login.name
                                )
                                    .then((result) => {
                                        const data = result.data;
                                        console.log('data', data);
                                        setLoading(false);
                                        if (data.success) {
                                            setErr('');
                                            dispatch({
                                                type: ACTIONS.SETUP,
                                                payload: {
                                                    token: data.data.token,
                                                    profile: data.data.profile,
                                                },
                                            });
                                        } else {
                                            setErr('Unknow Error');
                                        }
                                    })
                                    .catch((err) => {
                                        setLoading(false);
                                        setErr('Error loging in');
                                        console.log(err);
                                    });
                            })
                            .catch((err) => {
                                setLoading(false);
                                setErr('Error siging data');
                            });
                    } else {
                        setLoading(false);
                        setErr('Unknown err');
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    setErr(
                        err?.msg || err?.message || `Unknown err (${err.code})`
                    );
                });
        } else {
            setErr('Address not selected');
        }
    };

    return (
        <Box
            style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                background: 'red',
            }}
        >
            <Box
                component="main"
                style={{
                    backgroundColor: '#babcbf',
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Container
                    maxWidth="lg"
                    style={{
                        marginTop: '15%',
                        width: '100%',
                        justifyContent: 'center',
                        display: 'flex',
                    }}
                >
                    <Paper
                        style={{
                            padding: 16,
                            width: 480,
                        }}
                    >
                        <form
                            noValidate
                            autoComplete="off"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            {err ? (
                                <Chip
                                    variant="outlined"
                                    size="small"
                                    label={JSON.stringify(err || '""')}
                                    onDelete={() => setErr('')}
                                    style={{
                                        borderColor: 'crimson',
                                        color: 'crimson', //TODO theme
                                    }}
                                />
                            ) : null}
                            <p style={{textAlign: 'center', fontSize: 24}}>
                                Connect your wallet
                            </p>
                            <div style={{margin: 16}}>
                                <WalletComponent />
                            </div>

                            {alreadySignedUp ? null : (
                                <FormControl
                                    variant="outlined"
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <TextField
                                        size="small"
                                        required
                                        id="outlined-required"
                                        label="Nickname"
                                        placeholder="Enter your nickname"
                                        variant="outlined"
                                        value={login.name}
                                        onChange={(e) =>
                                            setLogin({
                                                ...login,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </FormControl>
                            )}
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    margin: '1rem 0',
                                }}
                            >
                                <Button
                                    disabled={loading}
                                    onClick={onGetNonce}
                                    variant="contained"
                                    component="label"
                                    color="primary"
                                >
                                    SignIn
                                    {loading && <CircularProgress size={24} />}
                                </Button>
                            </div>
                        </form>
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
}

export default function SignIn() {
    return <SignIncomponent />;
}
