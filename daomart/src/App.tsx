import React from 'react';
import './App.scss';
import {GitcoinProvider} from './store';
import {Pages} from './pages';
function App() {
    return (
        <GitcoinProvider>
            <Pages />
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
