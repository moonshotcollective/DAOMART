import React from 'react';
import './App.scss';
import {GitcoinProvider} from './store';
import {Pages} from './pages';
import {theme} from './theme';
import {ThemeProvider} from '@material-ui/styles';
function App() {
    return (
        <GitcoinProvider>
            <ThemeProvider theme={theme}>
                <Pages />
            </ThemeProvider>
        </GitcoinProvider>
    );
}

export default App;
declare global {
    interface Window {
        ethereum?: any;
        web3?: any;
        __CIPHER__?: any;
    }
}
