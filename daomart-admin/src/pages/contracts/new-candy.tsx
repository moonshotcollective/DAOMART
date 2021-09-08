import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Title from '../../components/Title.component';
import FormControl from '@material-ui/core/FormControl';
import {Paper} from '@material-ui/core';
import {GitcoinContext} from '../../store';
import {deployCandyContract} from '../../contracts';
import {useGetTokenContracts} from '../../hooks/Contract.hook';
import {MakeNewTokenContract} from '../../network/api';

const NewCandyContractContent = () => {
    const {state} = React.useContext(GitcoinContext);
    const [loading, setLoading] = React.useState(false);
    const [newContract, setNewContract] = React.useState({name: ''});
    const [snackbarOpen, setSnackbarOpen] = React.useState('');

    const [tokenContracts] = useGetTokenContracts(state.token, {
        chain: state.chain_id,
    });

    const onNewCandyContract = (address) => {
        setLoading(true);

        MakeNewTokenContract(state.token, {
            address: address,
            chain: state.chain_id,
        })
            .then((result) => {
                console.log('result', result);
                setSnackbarOpen('Contract Added to the database.');
                setLoading(false);
            })
            .catch((err) => {
                setSnackbarOpen('Some kind of error occured');
                setLoading(false);
                console.log(err);
            });
    };

    const onDeploy = () => {
        setLoading(true);
        deployCandyContract(state.chain_id)
            .then((res) => {
                console.log('deploy res', res);
                onNewCandyContract(res);
                setLoading(false);
            })
            .catch((err) => {
                setSnackbarOpen('Some kind of error occured');
                setLoading(false);
                console.log(err);
            });
    };
    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <Title>New Contract</Title>
            <Paper style={{padding: 16, marginTop: 32}}>
                <form noValidate autoComplete="off">
                    <FormControl variant="outlined" style={{width: '100%'}}>
                        <TextField
                            id="demo-simple-select-outlined"
                            required
                            label="Contract Name"
                            variant="outlined"
                            value={newContract.name}
                            onChange={(e) =>
                                setNewContract({
                                    ...newContract,
                                    name: e.target.value,
                                })
                            }
                        />
                    </FormControl>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginTop: '1rem',
                        }}
                    >
                        <p>{`CHAIN: ${state.chain_id}`}</p>
                        <Button
                            disabled={loading}
                            onClick={() => onDeploy()}
                            variant="contained"
                            component="label"
                            color="secondary"
                            style={{margin: '0 1rem'}}
                        >
                            Deploy
                            {loading && <CircularProgress size={24} />}
                        </Button>
                    </div>
                </form>
            </Paper>
            <Snackbar
                open={snackbarOpen !== ''}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen('')}
            >
                <Alert onClose={() => setSnackbarOpen('')} severity="success">
                    {snackbarOpen}
                </Alert>
            </Snackbar>
        </Container>
    );
};
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default NewCandyContractContent;
