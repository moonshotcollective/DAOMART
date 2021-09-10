import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useGetUserById} from '../../hooks/User.hook';
import {GitcoinContext} from '../../store';
import InboxIcon from '@material-ui/icons/Inbox';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Title from '../../components/Title.component';
import {Button, Paper, Divider} from '@material-ui/core';
import {useParams, useHistory} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {NetworkLogComponent} from '../../components/NetworkLog.component';
import {useGetHttpLogs} from '../../hooks/Log.hook';
import {useGetOrders} from '../../hooks/Order.hook';
function UserContent() {
    const {state} = React.useContext(GitcoinContext);

    const {uid} = useParams();
    const [user] = useGetUserById(state.token, uid);
    const [value, setValue] = React.useState(0);
    console.log('user', user);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <Title>User Panel</Title>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                >
                    <Tab label="User Card" {...a11yProps(0)} />
                    <Tab label="Activity" {...a11yProps(1)} />
                    <Tab label="Active Order" {...a11yProps(2)} />
                    <Tab label="Orders" {...a11yProps(3)} />
                    <Tab label="Logs" {...a11yProps(4)} />
                    <Tab label="ACTIONS" {...a11yProps(5)} />
                </Tabs>
            </AppBar>
            <UserTabContent value={value} index={0} user={user} />
            <ActivityTabContent value={value} index={1} user={user} />
            <ActiveOrderTabContent value={value} index={2} user={user} />
            <OrderTabContent
                value={value}
                index={3}
                user={user}
                token={state.token}
            />
            <LogTabContent
                value={value}
                index={4}
                user={user}
                token={state.token}
            />
            <ActionTabContent value={value} index={5} user={user} />
        </Container>
    );
}

export default UserContent;

const UserTabContent = ({
    value,
    index,
    user,
}: {
    value: number;
    index: number;
    user: User | null;
}) => {
    const accounts = user ? [user.address] : [];
    return (
        <TabPanel value={value} index={index}>
            <div style={{minHeight: 480}}>
                <div style={{padding: 8}}>
                    <Typography variant="overline" component={'h3'}>
                        {user?.user_id}
                    </Typography>
                    <div>
                        <Typography variant="body1" component="span">
                            {user?.name}
                            <Link variant="overline" style={{paddingLeft: 8}}>
                                {`(${user?.address})`}
                            </Link>
                        </Typography>
                    </div>
                    <div>
                        <MyChip label={user?.status} />
                        <MyChip label={user?.badge} />
                    </div>
                </div>

                <div style={{minHeight: 480, borderTop: '1px solid grey'}}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Address</TableCell>
                                <TableCell>Network</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {accounts.map((account, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        {' '}
                                        <Typography
                                            variant="overline"
                                            component={'h3'}
                                        >
                                            {account}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{'Mainnet'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </TabPanel>
    );
};
const ActivityTabContent = ({value, index, user}) => {
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
const ActiveOrderTabContent = ({value, index, user}) => {
    const activeOrders = [];
    return (
        <TabPanel value={value} index={index}>
            <div style={{minHeight: 480}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order NO#</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Progression</TableCell>
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
const OrderTabContent = ({value, index, user, token}) => {
    const [activeOrders] = useGetOrders(token, {user: user?.user_id});

    console.log('activeOrders', activeOrders);
    const els = activeOrders.map((c, i) => (
        <OrderCard key={c.order_id} order={c} />
    ));
    return (
        <TabPanel value={value} index={index}>
            <div style={{minHeight: 480}}>
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
            </div>
        </TabPanel>
    );
};

const OrderCard = ({order}) => {
    const router = useHistory();

    const navigate = () => {
        router.push(`/orders/${order.order_id}`);
    };
    return (
        <TableRow style={{cursor: 'pointer'}} onClick={navigate}>
            <TableCell scope="row">{order?.type}</TableCell>
            <TableCell scope="row">{order?.item?.name}</TableCell>
            <TableCell>{order?.user?.name}</TableCell>
            <TableCell>{order?.status}</TableCell>
        </TableRow>
    );
};

const LogTabContent = ({value, index, user, token}) => {
    const [logs] = useGetHttpLogs(token, {user: user?.user_id});
    console.log('logs', logs);

    return (
        <TabPanel value={value} index={index}>
            <div style={{minHeight: 480}}>
                <NetworkLogComponent logs={logs} />
            </div>
        </TabPanel>
    );
};
const ActionTabContent = ({value, index, user}) => {
    const activeOrders = [];
    return (
        <TabPanel value={value} index={index}>
            <div style={{minHeight: 480}}>
                <div style={{padding: 8}}>
                    <Typography variant="body1">Status Actions</Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        style={{margin: 8}}
                    >
                        Verify
                    </Button>
                    <Button variant="contained" style={{margin: 8}}>
                        Suspend
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{margin: 8}}
                    >
                        Ban
                    </Button>
                </div>
                <Divider variant="middle" />
                <div style={{padding: 8}}>
                    <Typography variant="body1">Badge Actions</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{margin: 8}}
                    >
                        Admin
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{margin: 8}}
                    >
                        Steward
                    </Button>
                    <Button variant="contained" style={{margin: 8}}>
                        Pleb
                    </Button>
                </div>
                <Divider variant="middle" />
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
