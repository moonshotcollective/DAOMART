import React from 'react';
import './App.scss';
import {GitcoinProvider} from './store';
import {Pages} from './pages';
import {theme} from './theme';
import {ThemeProvider} from '@material-ui/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
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
