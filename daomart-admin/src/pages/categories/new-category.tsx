import React, {ChangeEvent} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import {DrawerComponent} from '../../components/Drawer.component';
import {StatusBarComponent} from '../../components/StatusBar.component';
import {makeStyles, Paper, Divider, Input} from '@material-ui/core';
import {Button} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

import {adminPostReqHandler} from '../../network';
import {Chip} from '@material-ui/core';
import {constTags} from '../../util/tags';
import {GitcoinContext} from '../../store';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const initState: ProductCategory = {
    type: '',
    name: '',
    description: '',
    avatar: '',
    tags: [],
};

function NewCategoryPage() {
    const {state} = React.useContext(GitcoinContext);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [newCat, setNewCat] = React.useState<ProductCategory>(initState);

    const onNew = () => {
        setLoading(true);
        adminPostReqHandler(state.token, 'category/new', newCat)
            .then((result) => {
                setSnackbarOpen(true);
                setLoading(false);
                setNewCat(initState);
                console.log('result', result);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };
    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <Paper style={{padding: 16}}>
                <form
                    noValidate
                    autoComplete="off"
                    style={{width: '100%', margin: '1rem 0'}}
                >
                    <div>
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
                            Type
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            required
                            label="Type"
                            placeholder="Enter category type"
                            variant="outlined"
                            value={newCat.type}
                            onChange={(e: any) =>
                                setNewCat({
                                    ...newCat,
                                    type: e.target.value,
                                })
                            }
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'Merch'}>Merch</MenuItem>
                            <MenuItem value={'NFT'}>NFT</MenuItem>
                            <MenuItem value={'Kudos'}>Kudos</MenuItem>
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
                            placeholder="Enter category name"
                            variant="outlined"
                            value={newCat.name}
                            onChange={(e) =>
                                setNewCat({
                                    ...newCat,
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
                            placeholder="Enter category description"
                            variant="outlined"
                            value={newCat.description}
                            onChange={(e) =>
                                setNewCat({
                                    ...newCat,
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
                            value={newCat.tags}
                            onChange={(e: any) =>
                                setNewCat({
                                    ...newCat,
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
                            {constTags.map((value, i) => (
                                <MenuItem key={i} value={value}>
                                    <Checkbox
                                        checked={
                                            newCat.tags.indexOf(value) > -1
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
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity="success"
                >
                    New category successfully created!
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default NewCategoryPage;
