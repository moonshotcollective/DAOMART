import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import SignIn from '../components/SignIn.component';
import StatusBarComponent from '../components/StatusBar.component';
import Navbar from '../components/Navbar.component';
import {GitcoinContext} from '../store';
import {RouterWrapper, AuthRouter} from './router';
import {useGetSocket} from '../network/socket';

const Pages = () => {
    const {state} = React.useContext(GitcoinContext);
    const socket = useGetSocket(state.token);
    return (
        <Container maxWidth="xl">
            <Box className="background">
                <Router>
                    <CssBaseline />

                    <StatusBarComponent />
                    <Navbar />
                    <Box component="main">
                        <Container maxWidth="lg" style={{marginTop: '1rem'}}>
                            {state.isAuth === 'NEED_AUTH' ? (
                                <AuthRouter />
                            ) : (
                                <RouterWrapper />
                            )}
                        </Container>
                    </Box>
                </Router>
            </Box>
        </Container>
    );
};

export {Pages};
