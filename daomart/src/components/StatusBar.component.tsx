import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Image from './Image.component';
import MoonshotBotIcon from '../assets/images/bot00.png';
import WalletComponent from './Wallet.component';
import Container from '@material-ui/core/Container';

const Statusbar = ({}) => {
    return (
        <Container
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 8,
            }}
        >
            <WalletComponent />
        </Container>
    );
};

export default Statusbar;
