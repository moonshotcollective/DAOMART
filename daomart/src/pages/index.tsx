import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import StatusBarComponent from '../components/StatusBar.component';
import {GitcoinContext} from '../store';
import {RouterWrapper, AuthRouter} from './router';
import {useGetSocket} from '../network/socket';

const Pages = () => {
    const {state} = React.useContext(GitcoinContext);
    const socket = useGetSocket(state.token);
    return (
        <div
            style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                margin: 0,
                padding: 0,
            }}
            className="background"
        >
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    margin: 0,
                    padding: 0,
                }}
            >
                <Router>
                    <CssBaseline />

                    <StatusBarComponent />

                    <div
                        style={{
                            marginTop: '1rem',
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            margin: 0,
                            padding: 0,
                        }}
                    >
                        {state.isAuth === 'NEED_AUTH' ? (
                            <AuthRouter />
                        ) : (
                            <RouterWrapper />
                        )}
                    </div>
                </Router>
            </div>
        </div>
    );
};

export {Pages};
