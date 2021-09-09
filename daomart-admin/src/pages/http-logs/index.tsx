import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {NetworkLogComponent} from '../../components/NetworkLog.component';
import {useGetAllHttpLogs} from '../../hooks/Log.hook';
import {GitcoinContext} from '../../store';

function UserContent() {
    const {state} = React.useContext(GitcoinContext);
    const [logs] = useGetAllHttpLogs(state.token);

    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <p>LOGS</p>
            <Paper>
                <NetworkLogComponent logs={logs} />
            </Paper>
        </Container>
    );
}

export default UserContent;
