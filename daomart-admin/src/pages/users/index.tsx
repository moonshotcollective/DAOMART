import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Title from '../../components/Title.component';
import {useGetUsers} from '../../hooks/User.hook';
import {GitcoinContext} from '../../store';
import UserListComponent from './user.list';
function UserContent() {
    const {state} = React.useContext(GitcoinContext);
    const [users] = useGetUsers(state.token);

    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <Title>Users</Title>
            <Paper>
                <UserListComponent users={users} />
            </Paper>
        </Container>
    );
}

export default UserContent;
