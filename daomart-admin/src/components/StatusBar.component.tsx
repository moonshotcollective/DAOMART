import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import {useHistory} from 'react-router-dom';
import WalletComponent from './Wallet.component';
import {GitcoinContext} from '../store';
import React from 'react';
import {ACTIONS} from '../store/actions';
import Web3 from 'web3';
declare const window: any;
interface styleProps {
    open?: boolean;
}

const drawerWidth: number = 240;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: (props: styleProps) => ({
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            ...(props.open && {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            }),
        }),
    })
);

const StatusBarComponent = ({
    title,
    newBtn,
}: {
    title: string;
    newBtn?: string;
}) => {
    const {state, dispatch} = React.useContext(GitcoinContext);
    const styles = useStyles({open: state.drawerOpen});
    const router = useHistory();

    const navigate = (path) => {
        router.push(path);
    };

    const toggleDrawer = () => {
        dispatch({type: ACTIONS.TOGGLE_DRAWER});
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        router.replace('/');
    };
    const handleAccountsChanged = (accounts: string[]) => {
        dispatch({
            type: 'SET_WALLETS',
            payload: accounts,
        });
        let myweb3: any = new Web3(window.ethereum);

        dispatch({
            type: 'SET_PROVIDER',
            payload: myweb3.currentProvider,
        });
    };

    const handleChainChanged = (chainId: number) => {
        dispatch({
            type: 'SET_CHAIN_ID',
            //@ts-ignore
            payload: parseInt(chainId, 16).toString(),
        });
    };
    const _stup = async () => {
        if (!window.ethereum) {
            return;
        }
        let myweb3: any = new Web3(window.ethereum);
        const accounts = window.ethereum
            .request({
                method: 'eth_accounts',
            })
            .then(handleAccountsChanged)
            .catch((err: any) => console.error(err));
        //@ts-ignore
        window.ethereum.on('accountsChanged', handleAccountsChanged);

        window.ethereum.on('chainChanged', handleChainChanged);

        // let myweb3: any = new Web3(window.ethereum);

        dispatch({
            type: 'SET_CHAIN_ID',
            payload: (await myweb3.eth.net.getId()).toString(),
        });
    };

    React.useEffect(() => {
        let myweb3: any = new Web3(window.ethereum);
        dispatch({
            type: 'SET_PROVIDER',
            payload: myweb3.currentProvider,
        });
        _stup();

        return () => {
            if (window.ethereum.removeListener) {
                window.ethereum.removeListener(
                    'accountsChanged',
                    handleAccountsChanged
                );
                window.ethereum.removeListener(
                    'chainChanged',
                    handleChainChanged
                );
            }
        };
    }, []);

    return (
        <AppBar position="absolute" className={styles.appBar}>
            <Toolbar
                style={{
                    paddingRight: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    style={{
                        marginRight: '36px',
                        ...(state.drawerOpen && {display: 'none'}),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    style={{
                        flexGrow: 1,
                    }}
                >
                    {title}

                    {newBtn ? (
                        <IconButton
                            color="inherit"
                            aria-label="new"
                            onClick={() => navigate(newBtn)}
                        >
                            <AddToPhotosIcon />
                        </IconButton>
                    ) : null}
                </Typography>

                <WalletComponent />
                <IconButton color="inherit" onClick={() => logout()}>
                    <ExitToAppIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export {StatusBarComponent};
