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
import {useGetOrdersByUser} from '../../hooks/Order.hook';
import PeopleIcon from '@material-ui/icons/People';
import {
    blue,
    red,
    orange,
    pink,
    blueGrey,
    green,
    deepPurple,
} from '@material-ui/core/colors';
import {UpdateUserBadge, UpdateUserStatus} from '../../network/api';
function UserContent() {
    const {state} = React.useContext(GitcoinContext);

    const {uid} = useParams();
    const [trigger, setTrigger] = React.useState(false);
    const [user] = useGetUserById(state.token, uid, trigger);
    const [value, setValue] = React.useState(0);

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
            <UserTabContent
                value={value}
                index={0}
                user={user}
                token={state.token}
                onTrigger={() => setTrigger(!trigger)}
            />
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
    token,
    onTrigger,
}: {
    value: number;
    index: number;
    user: User | null;
    token: string;
    onTrigger: () => void;
}) => {
    const accounts = user ? [user.address] : [];
    return (
        <TabPanel value={value} index={index}>
            <div style={{minHeight: 480}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{padding: 8}}>
                        <div style={{width: '7rem'}}>
                            <Avatar
                                variant="rounded"
                                alt={'user'}
                                src={user?.avatar}
                                style={{
                                    width: '7rem',
                                    height: '7rem',
                                    objectFit: 'contain',
                                }}
                            >
                                {user?.avatar ? null : (
                                    <PeopleIcon fontSize="large" />
                                )}
                            </Avatar>
                        </div>
                    </div>
                    <div style={{flex: 1, padding: 8}}>
                        <Typography variant="overline" component={'h3'}>
                            {user?.user_id}
                        </Typography>
                        <div>
                            <Typography variant="body1" component="span">
                                {user?.name}
                                <Link
                                    variant="overline"
                                    style={{paddingLeft: 8}}
                                >
                                    {`(${user?.address})`}
                                </Link>
                            </Typography>
                        </div>
                        <div>
                            <MyChip label={user?.status} color="primary" />
                            <MyChip label={user?.badge} color="secondary" />
                        </div>
                        <UserBadgeComponent
                            user={user}
                            token={token}
                            onTrigger={onTrigger}
                        />

                        <Divider />
                        <UserStatusComponent
                            user={user}
                            token={token}
                            onTrigger={onTrigger}
                        />

                        <Divider />
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

const UserBadgeComponent = ({
    token,
    user,
    onTrigger,
}: {
    token: string;
    user: User | null;
    onTrigger: () => void;
}) => {
    const onBadgeChange = (badge: string) => {
        console.log('badge', badge);
        if (user && user.badge !== badge) {
            UpdateUserBadge(token, {uid: user.user_id, badge: badge})
                .then((result) => {
                    onTrigger();
                })
                .catch((err) => {
                    console.log('err', err);
                });
        } else {
            console.log('err');
        }
    };
    return (
        <div
            style={{display: 'flex', flexDirection: 'column', margin: '1rem 0'}}
        >
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Typography variant="overline" component={'h3'}>
                    User Badge
                </Typography>
            </div>

            <div style={{display: 'flex', flexDirection: 'row'}}>
                <BadgeComponent
                    onBadgeChange={onBadgeChange}
                    badge={'Pleb'}
                    isActive={user && user.badge == 'Pleb'}
                />
                <BadgeComponent
                    onBadgeChange={onBadgeChange}
                    badge={'Steward'}
                    isActive={user && user.badge == 'Steward'}
                />
                <BadgeComponent
                    onBadgeChange={onBadgeChange}
                    badge={'VIP'}
                    isActive={user && user.badge == 'VIP'}
                />
                <BadgeComponent
                    onBadgeChange={onBadgeChange}
                    badge={'Admin'}
                    isActive={user && user.badge == 'Admin'}
                />
            </div>
        </div>
    );
};
const UserStatusComponent = ({
    token,
    user,
    onTrigger,
}: {
    token: string;
    user: User | null;
    onTrigger: () => void;
}) => {
    const onStatusChange = (status: string) => {
        if (user && user.status != status) {
            UpdateUserStatus(token, {uid: user.user_id, status: status})
                .then((result) => {
                    onTrigger();
                })
                .catch((err) => {
                    console.log('err', err);
                });
        } else {
            console.log('err');
        }
    };
    return (
        <div
            style={{display: 'flex', flexDirection: 'column', margin: '1rem 0'}}
        >
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Typography variant="overline" component={'h3'}>
                    User Status
                </Typography>
            </div>

            <div style={{display: 'flex', flexDirection: 'row'}}>
                <StatusComponent
                    onStatusChange={onStatusChange}
                    status={'Banned'}
                    isActive={user && user.status == 'Banned'}
                />
                <StatusComponent
                    onStatusChange={onStatusChange}
                    status={'Suspended'}
                    isActive={user && user.status == 'Suspended'}
                />
                <StatusComponent
                    onStatusChange={onStatusChange}
                    status={'Not Verified'}
                    isActive={user && user.status == 'Not Verified'}
                />
                <StatusComponent
                    onStatusChange={onStatusChange}
                    status={'Verified'}
                    isActive={user && user.status == 'Verified'}
                />
            </div>
        </div>
    );
};

const badgeColors = {
    Pleb: blueGrey['A400'],
    Steward: orange[400],
    VIP: pink[400],
    Admin: deepPurple[400],
};
const statusColors = {
    Banned: red[400],
    Suspended: orange[400],
    'Not Verified': blue[400],
    Verified: green[400],
};
const BadgeComponent = ({
    badge,
    isActive,
    onBadgeChange,
}: {
    badge: string;
    isActive: boolean | null;
    onBadgeChange: (badge: string) => void;
}) => {
    return (
        <div
            onClick={() => onBadgeChange(badge)}
            style={{
                cursor: 'pointer',
                textAlign: 'center',
                border: '1px solid grey',
                width: '10rem',
                padding: '0.5rem 1rem',
                color: isActive ? 'white' : badgeColors[badge] || '#999',
                backgroundColor: isActive
                    ? badgeColors[badge] || 'transparent'
                    : 'transparent',
            }}
        >
            {badge}
        </div>
    );
};
const StatusComponent = ({
    status,
    isActive,
    onStatusChange,
}: {
    status: string;
    isActive: boolean | null;
    onStatusChange: (status: string) => void;
}) => {
    return (
        <div
            onClick={() => onStatusChange(status)}
            style={{
                cursor: 'pointer',
                textAlign: 'center',
                border: '1px solid grey',
                width: '10rem',
                padding: '0.5rem 1rem',
                color: isActive ? 'white' : statusColors[status] || '#999',
                backgroundColor: isActive
                    ? statusColors[status] || 'transparent'
                    : 'transparent',
            }}
        >
            {status}
        </div>
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
    const [activeOrders] = useGetOrdersByUser(token, user?.user_id);

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

const MyChip = ({label, color}: {label: string | undefined; color: any}) => {
    return label ? (
        <Chip label={label} color={color} style={{marginRight: 8}} />
    ) : null;
};
