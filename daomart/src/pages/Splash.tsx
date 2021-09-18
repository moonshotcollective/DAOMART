import React from 'react';
import Container from '@material-ui/core/Container';
import Image from '../components/Image.component';
import Typography from '@material-ui/core/Typography';
import ShopPhoto from '../assets/images/store.svg';
import {useTheme} from '@material-ui/core';
import {ACTIONS} from '../store/actions';
import {GitcoinContext} from '../store';
import {useHistory} from 'react-router-dom';

const Claim = () => {
    const theme = useTheme();
    const {state, dispatch} = React.useContext(GitcoinContext);
    const navigator = useHistory();
    React.useEffect(() => {
        if (state.isAuth === 'AUTHED') {
            navigator.replace('/shop');
        }
    }, [state.isAuth]);
    return (
        <Container
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Container
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '55vw',
                }}
            >
                <Image
                    src={ShopPhoto}
                    object-fit={'contain'}
                    width="100%"
                    alt="DAOMART CLAIM REWARD"
                />

                <Typography
                    align="center"
                    color="textPrimary"
                    variant="h5"
                    component="h6"
                    style={{marginTop: theme.spacing(2), fontWeight: 400}}
                    onClick={() => dispatch({type: ACTIONS.AUTHCHECK})}
                >
                    CLICK TO ENTER
                </Typography>
            </Container>
        </Container>
    );
};

export default Claim;
