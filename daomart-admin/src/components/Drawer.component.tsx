import Drawer from '@material-ui/core/Drawer';
import {useHistory} from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import StoreIcon from '@material-ui/icons/Store';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import {GitcoinContext} from '../store';
import React from 'react';
import {ACTIONS} from '../store/actions';
const drawerWidth: number = 240;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: (props: {open?: boolean}) => ({
            '& .MuiDrawer-paper': {
                position: 'relative',
                whiteSpace: 'nowrap',
                width: drawerWidth,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                boxSizing: 'border-box',
                ...(!props.open && {
                    overflowX: 'hidden',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    width: theme.spacing(7),
                    [theme.breakpoints.up('sm')]: {
                        width: theme.spacing(9),
                    },
                }),
            },
        }),
    })
);

const DrawerComponent = ({}) => {
    const {state, dispatch} = React.useContext(GitcoinContext);
    const styles = useStyles({open: state.drawerOpen});
    const router = useHistory();

    const navigate = (path) => {
        router.push(path);
    };

    const toggleDrawer = () => {
        dispatch({type: ACTIONS.TOGGLE_DRAWER});
    };
    return (
        <Drawer
            variant="permanent"
            open={state.drawerOpen}
            className={styles.drawer}
        >
            <Toolbar
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: 8,
                }}
            >
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    style={{
                        flexGrow: 1,
                    }}
                >
                    <Button color="primary" onClick={() => navigate('/')}>
                        DAOMART
                    </Button>
                </Typography>
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List>
                <MainListItems />
            </List>
            <Divider />
            <List>
                <SecondaryListItems />
            </List>
            <Divider />
            <List>
                <ContractListItems />
            </List>
        </Drawer>
    );
};

export {DrawerComponent};

const MainListItems = () => {
    const router = useHistory();

    const navigate = (path) => {
        router.push(path);
    };
    return (
        <div>
            <ListSubheader inset>Shop Management</ListSubheader>
            <ListItem button onClick={() => navigate('/categories')}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Categories" />
            </ListItem>
            <ListItem button onClick={() => navigate('/products')}>
                <ListItemIcon>
                    <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
            </ListItem>
            <ListItem button onClick={() => navigate('/orders')}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button onClick={() => navigate('/collections')}>
                <ListItemIcon>
                    <CollectionsBookmarkIcon />
                </ListItemIcon>
                <ListItemText primary="Collections" />
            </ListItem>
            <ListItem button onClick={() => navigate('/archives')}>
                <ListItemIcon>
                    <PermMediaIcon />
                </ListItemIcon>
                <ListItemText primary="Archive" />
            </ListItem>
            <ListItem button onClick={() => navigate('/stats')}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Stats" />
            </ListItem>{' '}
        </div>
    );
};

const SecondaryListItems = () => {
    const router = useHistory();

    const navigate = (path) => {
        router.push(path);
    };
    return (
        <div>
            <ListSubheader inset>User Management</ListSubheader>
            <ListItem button onClick={() => navigate('/users')}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="All Users" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Admins" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="VIP" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Stewards" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Plebs" />
            </ListItem>
        </div>
    );
};
const ContractListItems = () => {
    const router = useHistory();

    const navigate = (path) => {
        router.push(path);
    };
    return (
        <div>
            <ListSubheader inset>Contracts</ListSubheader>
            <ListItem button onClick={() => navigate('/contracts/product')}>
                <ListItemIcon>
                    <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Product Contracts" />
            </ListItem>
            <ListItem button onClick={() => navigate('/contracts/candy')}>
                <ListItemIcon>
                    <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Candy Contract" />
            </ListItem>
            <ListSubheader inset>LOGS</ListSubheader>
            <ListItem button onClick={() => navigate('/http-logs')}>
                <ListItemIcon>
                    <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Http Logs" />
            </ListItem>
            <ListItem button onClick={() => navigate('/godview')}>
                <ListItemIcon>
                    <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="God View" />
            </ListItem>
        </div>
    );
};
