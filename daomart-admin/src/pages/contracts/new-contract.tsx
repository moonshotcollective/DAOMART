import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Title from '../../components/Title.component';
import FormControl from '@material-ui/core/FormControl';
import {Paper, Divider} from '@material-ui/core';
import {GitcoinContext} from '../../store';
import {deployProductContract} from '../../contracts';
import {useGetTokenContracts} from '../../hooks/Contract.hook';
import {MakeNewProductContract} from '../../network/api';
import Typography from '@material-ui/core/Typography';

import {ethers} from 'ethers';
const initState = {
    name: '',
    items: [],
};
const NewContractContent = () => {
    const {state, dispatch} = React.useContext(GitcoinContext);
    const [loading, setLoading] = React.useState(false);
    const [newContract, setNewContract] = React.useState<any>(initState);
    const [newItem, setNewItem] = React.useState('');
    const [snackbarOpen, setSnackbarOpen] = React.useState('');

    const [tokenContracts] = useGetTokenContracts(state.token, {
        chain: state.chain_id,
    });

    const onNewProductContract = (address) => {
        setLoading(true);

        MakeNewProductContract(state.token, {
            address: address,
            name: newContract.name,
            productCount: newContract.items.length,
            chain: state.chain_id,
        })
            .then((result) => {
                console.log('result', result);
                setSnackbarOpen('Contract Added to the database.');
                setLoading(false);
                setNewContract(initState);
            })
            .catch((err) => {
                setSnackbarOpen('Some kind of error occured');
                setLoading(false);
                console.log(err);
            });
    };

    const onDeploy = () => {
        const candyContract = tokenContracts[0];
        if (!candyContract) {
            setSnackbarOpen('Candy Contract Not Found');
            return;
        }
        setLoading(true);
        deployProductContract(state.chain_id, [
            newContract.name,
            candyContract.address,
            newContract.items.map((i) => ethers.utils.formatBytes32String(i)),
            69,
        ])
            .then((res) => {
                console.log('deploy res', res);
                onNewProductContract(res);
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
            <Title>New Product Contract</Title>
            <Paper style={{padding: 8}}>
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

                    <Typography align="center" style={{marginTop: 16}}>
                        ITEMS
                    </Typography>
                    <div>
                        {newContract.items.length ? (
                            newContract.items.map((n, i) => (
                                <Typography
                                    key={i}
                                    style={{lineHeight: 4}}
                                    component="h3"
                                >
                                    <Divider />
                                    {`${i + 1}. ${n}`}
                                    <Divider />
                                </Typography>
                            ))
                        ) : (
                            <Typography align="center" variant="subtitle1">
                                No items yet
                            </Typography>
                        )}
                    </div>

                    <FormControl
                        variant="outlined"
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: 16,
                        }}
                    >
                        <TextField
                            style={{flex: 1}}
                            id="demo-simple-select-outlined"
                            required
                            label="New Item"
                            variant="outlined"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            onClick={() => {
                                newContract.items.push(newItem);
                                setNewItem('');
                                setNewContract({
                                    ...newContract,
                                    items: [...newContract.items],
                                });
                            }}
                        >
                            ADD
                        </Button>
                    </FormControl>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginTop: 16,
                        }}
                    >
                        <p>{`CHAIN: ${state.chain_id}`}</p>
                        <Button
                            disabled={loading}
                            onClick={() => onDeploy()}
                            variant="contained"
                            component="label"
                            color="secondary"
                            style={{marginLeft: 16}}
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

export default NewContractContent;
