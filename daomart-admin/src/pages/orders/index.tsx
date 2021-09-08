import React from 'react';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useGetOrders} from '../../hooks/Order.hook';
import {GitcoinContext} from '../../store';
import Title from '../../components/Title.component';
import {useHistory} from 'react-router-dom';
function OrderContent() {
    const {state} = React.useContext(GitcoinContext);
    const [orders] = useGetOrders(state.token);

    const els = orders.map((c) => <OrderCard key={c.order_id} order={c} />);
    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <Title newBtn="/orders/new">Orders</Title>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>Item Name</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{els}</TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default OrderContent;

const OrderCard = ({order}) => {
    const router = useHistory();

    const navigate = () => {
        router.push(`/orders/${order.order_id}`);
    };
    return (
        <TableRow style={{cursor: 'pointer'}} onClick={navigate}>
            <TableCell scope="row">{order.type}</TableCell>
            <TableCell scope="row">{order.item.name}</TableCell>
            <TableCell>{order.user.name}</TableCell>
            <TableCell>{order.status}</TableCell>
        </TableRow>
    );
};
