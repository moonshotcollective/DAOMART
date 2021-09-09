import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import SignIn from '../components/SignIn.component';
import {DrawerComponent} from '../components/Drawer.component';
import {StatusBarComponent} from '../components/StatusBar.component';
import {GitcoinContext} from '../store';
import RouterWrapper from './router';
import {useGetSocket} from '../network/socket';

const Pages = () => {
    const {state} = React.useContext(GitcoinContext);
    const socket = useGetSocket(state.token);

    if (!state.token) {
        return (
            <Container style={{marginTop: '1em'}}>
                <CssBaseline />

                <SignIn />
            </Container>
        );
    }
    return (
        <Box sx={{display: 'flex'}}>
            <Router>
                <CssBaseline />

                <StatusBarComponent title={'Dashboard'} />
                <DrawerComponent />
                <Box
                    component="main"
                    style={{
                        backgroundColor: '#caccd5',
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Container maxWidth="lg" style={{marginTop: '1rem'}}>
                        <RouterWrapper />
                    </Container>
                </Box>
            </Router>
        </Box>
    );
};

export {Pages};
