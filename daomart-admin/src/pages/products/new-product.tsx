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
import {MakeNewProduct} from '../../network/api';
import {constTags} from '../../util/tags';
import {useGetProductCategories} from '../../hooks/Shop.hooks';
import {useGetProductContracts} from '../../hooks/Contract.hook';
import {useGetProductContractItems} from '../../hooks/ProductContract.hook';
import {GitcoinContext} from '../../store';
import {useHistory} from 'react-router-dom';
import Title from '../../components/Title.component';
import {ethers} from 'ethers';
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const initState: Product = {
    contract: '',
    category: '',
    name: '',
    description: '',
    code: '',
    avatar: '',
    tags: [],
};

function NewProductPage() {
    const {state} = React.useContext(GitcoinContext);
    const [snackbarOpen, setSnackbarOpen] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [newProduct, setNewProduct] = React.useState<Product>(initState);
    const [categories] = useGetProductCategories(state.token);

    const [contracts] = useGetProductContracts(state.token, {
        chain: state.chain_id,
    });
    const [items] = useGetProductContractItems(newProduct.contract);
    const router = useHistory();

    const navigate = (path) => {
        router.push(path);
    };
    const onNew = () => {
        setLoading(true);
        console.log('newProduct', newProduct);
        MakeNewProduct(state.token, newProduct)
            .then((result) => {
                setSnackbarOpen('Success');
                setLoading(false);
                setNewProduct(initState);
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
            <Title>New Product</Title>
            <Paper style={{padding: 16}}>
                <form
                    noValidate
                    autoComplete="off"
                    style={{width: '100%', margin: '1rem 0'}}
                >
                    <div style={{width: '100%', margin: '1rem 0'}}>
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            <div
                                style={{
                                    height: 128,
                                    width: 128,
                                    border: '1px solid grey',
                                }}
                            ></div>
                            <Button variant="contained" component="label">
                                Upload Photo
                                <input type="file" hidden />
                            </Button>
                        </div>
                    </div>
                    <Divider />

                    <FormControl
                        variant="outlined"
                        style={{width: '100%', margin: '1rem 0'}}
                    >
                        <InputLabel id="demo-simple-select-outlined-label">
                            Category
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            required
                            label="Type"
                            placeholder="Enter product category"
                            variant="outlined"
                            value={newProduct.category}
                            onChange={(e: any) =>
                                setNewProduct({
                                    ...newProduct,
                                    category: e.target.value,
                                })
                            }
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {categories.map((c) => (
                                <MenuItem
                                    value={c.category_id}
                                    key={c.category_id}
                                >
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
                            Contract
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            required
                            label="Contract"
                            placeholder="Select the contract"
                            variant="outlined"
                            value={newProduct.contract}
                            onChange={(e: any) =>
                                setNewProduct({
                                    ...newProduct,
                                    contract: e.target.value,
                                })
                            }
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {contracts.map((c, i) => (
                                <MenuItem value={c.address.toString()} key={i}>
                                    {c.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => navigate('/contracts/product/new')}
                        >
                            DEPLOY NEW CONTRACT
                        </Button>
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        style={{width: '100%', margin: '1rem 0'}}
                    >
                        <Select
                            id="outlined-required"
                            label="Code"
                            placeholder="Enter product code (contract index)"
                            variant="outlined"
                            value={newProduct.code}
                            required
                            onChange={(e: any) =>
                                setNewProduct({
                                    ...newProduct,
                                    code: e.target.value,
                                })
                            }
                        >
                            <MenuItem value="">
                                <em>
                                    {newProduct.contract
                                        ? 'Please Select an Item'
                                        : 'Select the contract first'}
                                </em>
                            </MenuItem>
                            {newProduct.contract
                                ? items.map((c, i) => (
                                      <MenuItem value={i} key={i}>
                                          {ethers.utils.parseBytes32String(c)}
                                      </MenuItem>
                                  ))
                                : []}
                        </Select>
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        style={{width: '100%', margin: '1rem 0'}}
                    >
                        <TextField
                            required
                            id="outlined-required"
                            label="Name"
                            placeholder="Enter product name"
                            variant="outlined"
                            value={newProduct.name}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    name: e.target.value,
                                })
                            }
                        />
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
                            value={newProduct.description}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    description: e.target.value,
                                })
                            }
                        />
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        style={{width: '100%', margin: '1rem 0'}}
                    >
                        <InputLabel id="demo-mutiple-checkbox-label">
                            Tag
                        </InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            multiple
                            value={newProduct.tags}
                            onChange={(e: any) =>
                                setNewProduct({
                                    ...newProduct,
                                    tags: e.target.value,
                                })
                            }
                            input={<Input />}
                            renderValue={(selected) => (
                                <div
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        flexDirection: 'row',
                                    }}
                                >
                                    {(selected as string[]).map((value, i) => (
                                        <Chip key={i} label={value} />
                                    ))}
                                </div>
                            )}
                        >
                            {constTags.map((value) => (
                                <MenuItem key={value} value={value}>
                                    <Checkbox
                                        checked={
                                            newProduct.tags.indexOf(value) > -1
                                        }
                                    />
                                    <ListItemText primary={value} />
                                </MenuItem>
                            ))}
                        </Select>
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

export default NewProductPage;
