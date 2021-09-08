import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import {DrawerComponent} from '../../components/Drawer.component';
import {StatusBarComponent} from '../../components/StatusBar.component';
import {GitcoinContext} from '../../store';
import {ACTIONS} from '../../store/actions';
import Container from '@material-ui/core/Container';
import {Paper} from '@material-ui/core';
const CollectionsPage = () => {
    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <Paper style={{padding: 16}}> CollectionsPage</Paper>
        </Container>
    );
};

export default CollectionsPage;
