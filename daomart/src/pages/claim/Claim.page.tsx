import Container from '@material-ui/core/Container';
import Image from '../../components/Image.component';
import MalwareIcon from '../../assets/images/blushing_malware.png';
import HeartIcon from '../../assets/images/heart.png';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Web3 from 'web3';

import React from 'react';
import {GitcoinContext} from '../../store';
import {BigNumber} from 'ethers';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    useGetTokenContract,
    useGetTokenContractMeta,
} from '../../hooks/Contract.hook';
import {ACTIONS} from '../../store/actions';
declare const window: any;
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Claim = () => {
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const {state, dispatch} = React.useContext(GitcoinContext);
    const [contractMeta] = useGetTokenContractMeta(state.token, state.chain_id);
    const [contract] = useGetTokenContract(contractMeta);
    const Reward = 500;
    const onClaim = async () => {
        if (!contract) {
            return;
        }
        try {
            dispatch({type: ACTIONS.AUTHCHECK});
            setLoading(true);
            contract.methods
                .getCandy(
                    state.wallets[state.wallet],
                    BigNumber.from(10).pow(18).mul(Reward)
                )
                .send({
                    from: state.wallets[state.wallet],
                })
                .then((res) => {
                    dispatch({type: ACTIONS.TRIGGER_CANDY_BALANCE});
                    setLoading(false);
                    setSnackbarOpen(true);
                })
                .catch((err) => {
                    setLoading(false);
                });
        } catch (err) {
            setLoading(false);
        }
    };
    return (
        <Container
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                paddingTop: '7%',
            }}
        >
            <Image
                src={MalwareIcon}
                object-fit={'contain'}
                height="256"
                width="256"
                alt="DAOMART CLAIM REWARD"
            />
            <Container style={{flex: 0, padding: 32, margin: 0}}>
                <Typography
                    className="custom-font DeterminationMWR"
                    variant={'h3'}
                >
                    Congratulations
                </Typography>
                <Typography
                    className="custom-font DeterminationMWR"
                    variant="h6"
                    align="center"
                >
                    {`YOU ARE ELLIGABLE TO CLAIM`}
                    <p style={{margin: 0}}>
                        <span
                            style={{
                                color: 'crimson',
                                fontWeight: 'bold',
                                padding: '0 0.5rem',
                                fontSize: '1.5rem',
                            }}
                        >
                            {`Ξ${Reward}`}
                        </span>
                        {`Reward tokens`}
                    </p>
                </Typography>
                <Container
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        padding: 32,
                    }}
                >
                    <Button
                        style={{
                            width: '10rem',
                            border: '2px solid rgba(40,40,40,.75)',
                            color: 'rgba(40,40,40,1)',
                            borderRadius: 0,
                            fontWeight: 'bolder',
                            fontFamily: 'DeterminationMonoWebRegular',
                            fontSize: '2rem',
                        }}
                        onClick={() => onClaim()}
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress size={24} />
                        ) : (
                            <div>
                                <Image
                                    src={HeartIcon}
                                    height="24"
                                    width="24"
                                    object-fit={'contain'}
                                    alt="DAOMART CLAIM REWARD"
                                />
                                CLAIM!
                            </div>
                        )}
                    </Button>
                </Container>
            </Container>
            <Image
                src={MalwareIcon}
                object-fit={'contain'}
                height="256"
                width="256"
                alt="DAOMART CLAIM REWARD"
            />

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity="success"
                >
                    successfully claimed 69 RWD tokens!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Claim;
