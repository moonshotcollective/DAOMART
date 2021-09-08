import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import {Paper, Divider} from '@material-ui/core';
import {Button} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import {MakeNewOrder} from '../../network/api';
import {constTags} from '../../util/tags';
import {GitcoinContext} from '../../store';
import Title from '../../components/Title.component';
import {ethers} from 'ethers';
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const initState: Order | any = {
    type: '',
    item: null,
    user: '',
    status: '',
    description: '',
    // order_id: ''
};

function NewOrderPage() {
    const {state} = React.useContext(GitcoinContext);
    const [snackbarOpen, setSnackbarOpen] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [newOrder, setNewOrder] = React.useState<Order>(initState);

    const products: Product[] = [];
    const users: User[] = [];

    const onNew = () => {
        setLoading(true);
        console.log('newOrder', newOrder);
        MakeNewOrder(state.token, newOrder)
            .then((result) => {
                setSnackbarOpen('Success');
                setLoading(false);
                setNewOrder(initState);
                console.log('result', result);
            })
            .catch((err) => {
                setSnackbarOpen('ERROR 500');
                setLoading(false);
                console.log(err);
            });
    };
    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <Title>New Order</Title>
            <Paper style={{padding: 16}}>
                <form
                    noValidate
                    autoComplete="off"
                    style={{width: '100%', margin: '1rem 0'}}
                >
                    <FormControl
                        variant="outlined"
                        style={{width: '100%', margin: '1rem 0'}}
                    >
                        <InputLabel id="demo-simple-select-outlined-label">
                            Status
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            required
                            label="Type"
                            placeholder="Select type"
                            variant="outlined"
                            value={newOrder.status || 'pending'}
                            onChange={(e: any) =>
                                setNewOrder({
                                    ...newOrder,
                                    status: e.target.value || 'pending',
                                })
                            }
                        >
                            <MenuItem value="">
                                <em>Pending is default</em>
                            </MenuItem>
                            {['pending', 'cancelled', 'paid'].map((c, i) => (
                                <MenuItem value={c} key={i}>
                                    {c}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        style={{width: '100%', margin: '1rem 0'}}
                    >
                        <InputLabel id="demo-simple-select-outlined-label">
                            Type
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            required
                            label="Type"
                            placeholder="Select type"
                            variant="outlined"
                            value={newOrder.type || 'Full'}
                            onChange={(e: any) =>
                                setNewOrder({
                                    ...newOrder,
                                    type: e.target.value || 'Full',
                                })
                            }
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {['Full', 'BitByBit'].map((c, i) => (
                                <MenuItem value={c} key={i}>
                                    {c}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        style={{width: '100%', margin: '1rem 0'}}
                    >
                        <InputLabel id="demo-simple-select-outlined-label">
                            User
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            required
                            label="User"
                            placeholder="Select user"
                            variant="outlined"
                            value={newOrder.user}
                            onChange={(e: any) =>
                                setNewOrder({
                                    ...newOrder,
                                    user: e.target.value,
                                })
                            }
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {users.map((c, i) => (
                                <MenuItem value={c.user_id} key={i}>
                                    {c.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl
                        variant="outlined"
                        style={{width: '100%', margin: '1rem 0'}}
                    >
                        <InputLabel id="demo-simple-select-outlined-label">
                            Product
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            required
                            label="Product"
                            placeholder="Select product"
                            variant="outlined"
                            value={newOrder.user}
                            onChange={(e: any) =>
                                setNewOrder({
                                    ...newOrder,
                                    user: e.target.value,
                                })
                            }
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {products.map((c, i) => (
                                <MenuItem value={c.product_id} key={i}>
                                    {c.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        style={{width: '100%', margin: '1rem 0'}}
                    >
                        <TextField
                            required
                            id="outlined-required"
                            label="Description"
                            placeholder="Enter product description"
                            variant="outlined"
                            value={newOrder.description}
                            onChange={(e) =>
                                setNewOrder({
                                    ...newOrder,
                                    description: e.target.value,
                                })
                            }
                        />
                    </FormControl>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Button
                            disabled={loading}
                            onClick={onNew}
                            variant="contained"
                            component="label"
                            color="primary"
                        >
                            Create
                            {loading && <CircularProgress size={24} />}
                        </Button>
                    </div>
                </form>
            </Paper>

            <Snackbar
                open={snackbarOpen != ''}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen('')}
            >
                <Alert onClose={() => setSnackbarOpen('')} severity="success">
                    {snackbarOpen}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default NewOrderPage;
