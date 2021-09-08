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
