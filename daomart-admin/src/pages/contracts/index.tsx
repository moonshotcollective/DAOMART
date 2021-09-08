import React from 'react';
import Container from '@material-ui/core/Container';
import ListItem, {ListItemProps} from '@material-ui/core/ListItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Chip from '@material-ui/core/Chip';
import Title from '../../components/Title.component';
import {Paper} from '@material-ui/core';
import {GitcoinContext} from '../../store';
import {useGetProductContracts} from '../../hooks/Contract.hook';

const ContractContent = () => {
    const {state, dispatch} = React.useContext(GitcoinContext);

    const [loading, setLoading] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

    const [productContracts] = useGetProductContracts(state.token, {
        chain: state.chain_id,
    });

    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <Title newBtn="/contracts/product/new">Product Contract</Title>

            <Paper>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Chain</TableCell>
                            <TableCell>ProductCount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productContracts.map((account, i) => (
                            <TableRow key={i}>
                                <TableCell>{account.type}</TableCell>
                                <TableCell>
                                    <Typography
                                        variant="overline"
                                        component={'h3'}
                                    >
                                        {account.address}
                                    </Typography>
                                </TableCell>
                                <TableCell>{account.name}</TableCell>
                                <TableCell>{account.chain}</TableCell>
                                <TableCell>{account.productCount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
};
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default ContractContent;
