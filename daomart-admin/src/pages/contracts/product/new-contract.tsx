import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Title from '../../../components/Title.component';
import FormControl from '@material-ui/core/FormControl';
import {Paper} from '@material-ui/core';
import {GitcoinContext} from '../../../store';
import {deployProductContract} from '../../../contracts';
import {useGetTokenContracts} from '../../../hooks/Contract.hook';
import {MakeNewProductContract} from '../../../network/api';
import Typography from '@material-ui/core/Typography';
import {Importer, ImporterField} from 'react-csv-importer';
import Modal from '@material-ui/core/Modal';
import 'react-csv-importer/dist/index.css';
import {ethers} from 'ethers';
import GridOnIcon from '@material-ui/icons/GridOn';
import {green} from '@material-ui/core/colors';
import {
    validateNaturalNumber,
    validateNaturalNumberWithDecimals,
    validateDateTime,
} from '../../../util/validators';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import {
    FirstPage,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    LastPage,
} from '@material-ui/icons';
import {useTheme} from '@material-ui/styles';

const initState = {
    name: '',
    items: [] as ProductContractItemRow[],
};
const initNewItemState = {
    name: '',
    quantity: 100,
    coefficient: 1,
    release: new Date(),
    initialEthPrice: 0.05,
    initialCandyPrice: 100,
};

const NewContractContent = () => {
    const {state, dispatch} = React.useContext(GitcoinContext);
    const [loading, setLoading] = React.useState(false);
    const [newContract, setNewContract] = React.useState<any>(initState);
    const [newItem, setNewItem] =
        React.useState<ProductContractItemRow>(initNewItemState);
    const [csvModalVisible, setcsvModalVisible] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState<{
        msg: string;
        type: 'success' | 'error';
    } | null>(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
                setSnackbarOpen({
                    type: 'success',
                    msg: 'Contract Added to the database.',
                });
                setLoading(false);
                setNewContract(initState);
            })
            .catch((err) => {
                setSnackbarOpen({
                    type: 'error',
                    msg: 'Some kind of error occured',
                });
                setLoading(false);
                console.log(err);
            });
    };

    const onDeploy = () => {
        const candyContract = tokenContracts[0];
        if (!candyContract) {
            setSnackbarOpen({
                type: 'error',
                msg: 'Candy Contract Not Found or not found',
            });
            return;
        }
        if (!newContract.items.length) {
            setSnackbarOpen({
                type: 'error',
                msg: 'Need atleast 1 item',
            });
            return;
        }
        setLoading(true);
        try {
            deployProductContract(state.chain_id, [
                newContract.name,
                candyContract.address,
                newContract.items.map((i) =>
                    ethers.utils.formatBytes32String(i.name.substr(0, 31))
                ),
                newContract.items.map((i) => i.quantity.toString()),
                newContract.items.map((i) => (i.coefficient * 1e2).toString()),
                newContract.items.map((i) =>
                    Math.floor(new Date(i.release).getTime() / 1e3).toString()
                ),
                newContract.items.map((i) =>
                    ethers.utils
                        .parseEther(i.initialEthPrice.toString())
                        .toString()
                ),
                newContract.items.map((i) =>
                    ethers.utils
                        .parseEther(i.initialCandyPrice.toString())
                        .toString()
                ),
            ])
                .then((res) => {
                    console.log('deploy res', res);
                    onNewProductContract(res);
                    setLoading(false);
                })
                .catch((err) => {
                    setSnackbarOpen({
                        type: 'error',
                        msg: 'Some kind of error occured',
                    });
                    setLoading(false);
                    console.log(err);
                });
        } catch (err) {
            setSnackbarOpen({
                type: 'error',
                msg: 'Some kind of error occured',
            });
            setLoading(false);
            console.log('err', err);
        }
    };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <Title>New Product Contract</Title>
            <Paper style={{padding: 12}}>
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
                            marginTop: 18,
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        <Typography style={{flex: 1}}>ITEMS</Typography>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignSelf: 'flex-end',
                            }}
                        >
                            <Button
                                style={{
                                    borderColor: green.A400,
                                    color: green.A200,
                                }}
                                variant="outlined"
                                color="primary"
                                startIcon={<GridOnIcon />}
                                onClick={() => setcsvModalVisible(true)}
                            >
                                Import CSV
                            </Button>
                        </div>
                    </div>

                    <div>
                        <Table aria-label="table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Item Quantity</TableCell>
                                    <TableCell>Coefficient% (*1e-3)</TableCell>
                                    <TableCell>Release</TableCell>
                                    <TableCell>Initial Eth Price</TableCell>
                                    <TableCell>Initial Candy Price</TableCell>
                                    <TableCell>X</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {newContract && newContract.items.length ? (
                                    newContract.items
                                        .slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        .map((item, i) => {
                                            return (
                                                <TableRow
                                                    key={i}
                                                    style={{cursor: 'pointer'}}
                                                >
                                                    <TableCell>
                                                        {item.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.quantity}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.coefficient}
                                                    </TableCell>{' '}
                                                    <TableCell>
                                                        {new Date(
                                                            item.release
                                                        ).toLocaleString()}
                                                    </TableCell>{' '}
                                                    <TableCell>
                                                        {item.initialEthPrice}
                                                    </TableCell>{' '}
                                                    <TableCell>
                                                        {item.initialCandyPrice}
                                                    </TableCell>
                                                    <TableCell
                                                        onClick={() => {
                                                            newContract.items.splice(
                                                                i,
                                                                1
                                                            );
                                                            setNewContract({
                                                                ...newContract,
                                                                items: [
                                                                    ...newContract.items,
                                                                ],
                                                            });
                                                        }}
                                                    >{`X`}</TableCell>
                                                </TableRow>
                                            );
                                        })
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                        >{`NO ITEMS YET`}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow
                                    style={{
                                        border: '1px solid green',
                                        borderColor: green[200],
                                    }}
                                >
                                    <TableCell style={{padding: 0}}>
                                        <TextField
                                            style={{
                                                width: '100%',
                                                borderRight: '1px solid grey',
                                            }}
                                            id="demo-simple-name-outlined"
                                            required
                                            label="Item name"
                                            variant="filled"
                                            value={newItem.name}
                                            onChange={(e) =>
                                                setNewItem({
                                                    ...newItem,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            padding: 0,
                                        }}
                                    >
                                        <TextField
                                            style={{
                                                width: '100%',
                                                borderRight: '1px solid grey',
                                            }}
                                            id="demo-simple-quantity-outlined"
                                            required
                                            label="Quantity"
                                            variant="filled"
                                            value={newItem.quantity}
                                            onChange={(e) =>
                                                setNewItem({
                                                    ...newItem,
                                                    quantity:
                                                        validateNaturalNumber(
                                                            e.target.value
                                                        ),
                                                })
                                            }
                                        />
                                    </TableCell>
                                    <TableCell style={{padding: 0}}>
                                        <TextField
                                            style={{
                                                width: '100%',
                                                borderRight: '1px solid grey',
                                            }}
                                            id="demo-simple-coefficient-outlined"
                                            required
                                            label="Coefficient"
                                            variant="filled"
                                            value={newItem.coefficient}
                                            onChange={(e) =>
                                                setNewItem({
                                                    ...newItem,
                                                    coefficient:
                                                        validateNaturalNumberWithDecimals(
                                                            e.target.value
                                                        ),
                                                })
                                            }
                                        />
                                    </TableCell>
                                    <TableCell style={{padding: 0}}>
                                        <TextField
                                            type="datetime-local"
                                            style={{
                                                width: '100%',
                                                borderRight: '1px solid grey',
                                            }}
                                            id="demo-simple-coefficient-outlined"
                                            required
                                            label="Release"
                                            variant="filled"
                                            value={newItem.release}
                                            onChange={(e) => {
                                                console.log(
                                                    'e.target',
                                                    e.target.value,
                                                    validateDateTime(
                                                        e.target.value
                                                    ).toISOString()
                                                );
                                                setNewItem({
                                                    ...newItem,
                                                    release: validateDateTime(
                                                        e.target.value
                                                    ),
                                                });
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell style={{padding: 0}}>
                                        <TextField
                                            style={{
                                                width: '100%',
                                                borderRight: '1px solid grey',
                                            }}
                                            id="demo-simple-coefficient-outlined"
                                            required
                                            label="Initial Eth price"
                                            variant="filled"
                                            value={newItem.initialEthPrice}
                                            onChange={(e) =>
                                                setNewItem({
                                                    ...newItem,
                                                    initialEthPrice:
                                                        validateNaturalNumberWithDecimals(
                                                            e.target.value
                                                        ),
                                                })
                                            }
                                        />
                                    </TableCell>{' '}
                                    <TableCell style={{padding: 0}}>
                                        <TextField
                                            style={{
                                                width: '100%',
                                                borderRight: '1px solid grey',
                                            }}
                                            id="demo-simple-coefficient-outlined"
                                            required
                                            label="Initial Candy price"
                                            variant="filled"
                                            value={newItem.initialCandyPrice}
                                            onChange={(e) =>
                                                setNewItem({
                                                    ...newItem,
                                                    initialCandyPrice:
                                                        validateNaturalNumberWithDecimals(
                                                            e.target.value
                                                        ),
                                                })
                                            }
                                        />
                                    </TableCell>
                                    <TableCell style={{padding: 0}}>
                                        <Button
                                            style={{
                                                width: '100%',
                                                lineHeight: '2.7rem',
                                                borderRadius: 0,
                                                backgroundColor: green[200],
                                                color: 'white',
                                            }}
                                            variant="outlined"
                                            onClick={() => {
                                                if (!newItem.name) {
                                                    return setSnackbarOpen({
                                                        type: 'error',
                                                        msg: 'Please Enter items name.',
                                                    });
                                                }
                                                if (newItem.name.length > 31) {
                                                    return setSnackbarOpen({
                                                        type: 'error',
                                                        msg: 'Item name should be less than 32 characters',
                                                    });
                                                }
                                                if (!newItem.quantity) {
                                                    return setSnackbarOpen({
                                                        type: 'error',
                                                        msg: 'Please Enter items quantity.',
                                                    });
                                                }
                                                if (!newItem.coefficient) {
                                                    return setSnackbarOpen({
                                                        type: 'error',
                                                        msg: 'Please Enter items coefficient.',
                                                    });
                                                }
                                                if (
                                                    !(
                                                        Number(
                                                            newItem.coefficient
                                                        ) > 0 &&
                                                        Number(
                                                            newItem.coefficient
                                                        ) < 100
                                                    )
                                                ) {
                                                    return setSnackbarOpen({
                                                        type: 'error',
                                                        msg: 'coefficient needs to be between 0 and 100',
                                                    });
                                                }
                                                newContract.items.push(newItem);
                                                setNewItem(initNewItemState);
                                                setNewContract({
                                                    ...newContract,
                                                    items: [
                                                        ...newContract.items,
                                                    ],
                                                });
                                            }}
                                        >
                                            ADD
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[
                                            5,
                                            10,
                                            25,
                                            {label: 'All', value: -1},
                                        ]}
                                        colSpan={4}
                                        count={newContract.items.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: {
                                                'aria-label': 'rows per page',
                                            },
                                            native: true,
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={
                                            handleChangeRowsPerPage
                                        }
                                        ActionsComponent={
                                            TablePaginationActions
                                        }
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>

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
                open={snackbarOpen !== null}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(null)}
            >
                <Alert
                    onClose={() => setSnackbarOpen(null)}
                    severity={snackbarOpen?.type}
                >
                    {snackbarOpen?.msg}
                </Alert>
            </Snackbar>

            <CsvImporter
                onFinishedImporting={(rows) => {
                    setNewContract({...newContract, items: rows});
                    setcsvModalVisible(false);
                }}
                open={csvModalVisible}
                onClose={() => setcsvModalVisible(false)}
            />
        </Container>
    );
};
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default NewContractContent;

const CsvImporter = ({
    open,
    onClose,
    onImportingViaCsv,
    onDataChange,
    onCompletedParsing,
    onFinishedImporting,
}: {
    open: boolean;
    onClose?: () => void;
    onImportingViaCsv?: () => void;
    onDataChange?: (x: ProductContractItemRow[], i: number) => void;
    onCompletedParsing?: () => void;
    onFinishedImporting: (ax: ProductContractItemRow[]) => void;
}) => {
    const [totalRows, setTotalRows] = React.useState<ProductContractItemRow[]>(
        []
    );

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div
                    style={{
                        margin: 'auto',
                        backgroundColor: 'white',
                        padding: 32,
                        width: '70%',
                        marginTop: '10%',
                    }}
                >
                    <Importer
                        chunkSize={10000}
                        assumeNoHeaders={false}
                        restartable={false}
                        onStart={({
                            file,
                            fields,
                            columns,
                            skipHeaders,
                        }: any) => {
                            console.log('columns', columns);
                            if (onImportingViaCsv) {
                                onImportingViaCsv();
                            }
                        }}
                        processChunk={async (
                            rows: ProductContractItemRow[],
                            {startIndex}
                        ) => {
                            if (onDataChange) {
                                onDataChange(rows, startIndex);
                            }
                            console.log('totalRo', totalRows, rows, [
                                ...totalRows,
                                ...rows,
                            ]);
                            setTotalRows((prev) => [
                                ...prev,
                                ...rows.map((i) => ({
                                    ...i,
                                    name: (i.name || 'NOT_FOUND').substr(0, 31),
                                })),
                            ]);
                        }}
                        onComplete={({file, preview, fields, columnFields}) => {
                            if (onCompletedParsing) {
                                onCompletedParsing();
                            }
                        }}
                        onClose={({file, preview, fields, columnFields}) => {
                            onFinishedImporting(totalRows);
                        }}

                        // CSV options passed directly to PapaParse if specified:
                        // delimiter={...}
                        // newline={...}
                        // quoteChar={...}
                        // escapeChar={...}
                        // comments={...}
                        // skipEmptyLines={...}
                        // delimitersToGuess={...}
                    >
                        <ImporterField name="name" label="Name" />
                        <ImporterField name="quantity" label="Quantity" />
                        <ImporterField name="coefficient" label="Coefficient" />
                    </Importer>
                </div>
            </div>
        </Modal>
    );
};

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number
    ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const {count, page, rowsPerPage, onPageChange} = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div style={{width: '30rem'}}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                <FirstPage />
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                <LastPage />
            </IconButton>
        </div>
    );
}
