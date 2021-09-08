import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useGetOrderById} from '../../hooks/Order.hook';
import {GitcoinContext} from '../../store';
import Chip from '@material-ui/core/Chip';
import Title from '../../components/Title.component';
import {Button, Paper, Divider} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
function OrderPanelPage() {
    const {state} = React.useContext(GitcoinContext);

    const {oid} = useParams();
    const [order] = useGetOrderById(state.token, oid);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <Title>Order Panel</Title>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                >
                    <Tab label="Order Card" {...a11yProps(0)} />
                    <Tab label="Activity" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <OrderTabContent value={value} index={0} order={order} />
            <ActivityTabContent value={value} index={1} order={order} />
        </Container>
    );
}

export default OrderPanelPage;

const OrderTabContent = ({
    value,
    index,
    order,
}: {
    value: number;
    index: number;
    order: Order | null;
}) => {
    const onStatusChange = (status) => {};
    return (
        <TabPanel value={value} index={index}>
            <div style={{minHeight: 480}}>
                <div style={{padding: 8}}>
                    <Typography variant="overline" component={'h3'}>
                        {order?.order_id}
                    </Typography>
                    <div>
                        <Typography variant="body1" component="span">
                            {` User: ${order?.user?.name}`}
                            <Link variant="overline" style={{paddingLeft: 8}}>
                                {`(${order?.user?.address})`}
                            </Link>
                        </Typography>
                    </div>{' '}
                    <div>
                        <Typography variant="body1" component="span">
                            {` Product: ${order?.item?.name}`}
                            <Link variant="overline" style={{paddingLeft: 8}}>
                                {`(${order?.item?.product_id})`}
                            </Link>
                        </Typography>
                    </div>
                    <div>
                        <MyChip label={order?.status} />
                        <MyChip label={order?.type} />
                    </div>
                </div>
                <div style={{padding: 8}}>
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
                                value={order?.status || 'pending'}
                                onChange={(e) => onStatusChange(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>Pending is default</em>
                                </MenuItem>
                                {['pending', 'cancelled', 'paid'].map(
                                    (c, i) => (
                                        <MenuItem value={c} key={i}>
                                            {c}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>
                    </form>
                </div>{' '}
            </div>
        </TabPanel>
    );
};
const ActivityTabContent = ({value, index, order}) => {
    const activeOrders = [];
    return (
        <TabPanel value={value} index={index}>
            <div style={{minHeight: 480}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Event</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Timestamp</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activeOrders.map((account, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Typography
                                        variant="overline"
                                        component={'h3'}
                                    >
                                        TODO
                                    </Typography>
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </TabPanel>
    );
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const a11yProps = (index: any) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

const TabPanel = (props: TabPanelProps) => {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{padding: 0}}
            {...other}
        >
            {value === index && (
                <Box>
                    <Paper
                        style={{
                            borderRadius: 0,
                        }}
                    >
                        {children}
                    </Paper>
                </Box>
            )}
        </div>
    );
};

const MyChip = ({label}: {label: string | undefined}) => {
    return label ? <Chip label={label} style={{marginRight: 8}} /> : null;
};
