import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {useGetOrders} from '../../hooks/Order.hook';
import {GitcoinContext} from '../../store';
import Title from '../../components/Title.component';
import OrderListComponent from './order.list';
function OrderContent() {
    const {state} = React.useContext(GitcoinContext);
    const [orders] = useGetOrders(state.token);

    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <Title newBtn="/orders/new">Orders</Title>
            <Paper>
                <OrderListComponent orders={orders} />
            </Paper>
        </Container>
    );
}

export default OrderContent;
