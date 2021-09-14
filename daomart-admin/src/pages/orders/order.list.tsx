import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import {useHistory} from 'react-router-dom';
import {useTheme} from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import {
    FirstPage,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    LastPage,
} from '@material-ui/icons';
import {green, blueGrey, red, pink, indigo} from '@material-ui/core/colors';
import {Theme} from '@material-ui/core';

function OrderListComponent({orders}: {orders: Order[]}) {
    const theme = useTheme<Theme>();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const els = orders.map((c) => (
        <OrderCard key={c.order_id} order={c} theme={theme} />
    ));

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
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell width={3} align="center">
                        Type
                    </TableCell>
                    <TableCell width={3} align="center">
                        Status
                    </TableCell>
                    <TableCell>Item</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell width={3} align="center">
                        Timestamp
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {els.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                )}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[
                            5,
                            10,
                            25,
                            {label: 'All', value: -1},
                        ]}
                        colSpan={4}
                        count={orders.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: {
                                'aria-label': 'rows per page',
                            },
                            native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    );
}

export default OrderListComponent;

const OrderCard = ({order, theme}: {order: Order; theme: Theme}) => {
    const router = useHistory();

    const navigate = () => {
        router.push(`/orders/${order.order_id}`);
    };
    return (
        <TableRow style={{cursor: 'pointer'}} onClick={navigate}>
            <TableCell
                width={3}
                align="center"
                style={{
                    color: theme.palette.primary.light,
                    textShadow: '1px 1px 3px ' + theme.palette.primary.dark,
                    backgroundColor:
                        typeColors[order.type] || theme.palette.primary.dark,
                }}
            >
                {order.type}
            </TableCell>
            <TableCell
                width={3}
                align="center"
                style={{
                    color: theme.palette.primary.light,
                    textShadow: '1px 1px 3px ' + theme.palette.primary.dark,
                    backgroundColor:
                        statusColors[order.status] ||
                        theme.palette.primary.dark,
                    borderLeft: '2px solid ' + theme.palette.primary.light,
                }}
            >
                {order.status}
            </TableCell>
            <TableCell scope="row">{order.item?.name || '---'}</TableCell>
            <TableCell>{order.user?.name || '---'}</TableCell>
            <TableCell style={{fontSize: '0.7rem'}} width={3} align="center">
                {order.created_at
                    ? new Date(order.created_at).toLocaleString()
                    : 'INVALID'}
            </TableCell>
        </TableRow>
    );
};

const statusColors = {
    paid: green['A400'],
    pending: blueGrey['700'],
    cancelled: pink[600],
};
const typeColors = {
    Full: indigo['A200'],
    BitByBit: red['A400'],
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
