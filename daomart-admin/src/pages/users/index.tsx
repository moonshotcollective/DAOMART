import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem, {ListItemProps} from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Title from '../../components/Title.component';
import {useGetUsers} from '../../hooks/User.hook';
import {GitcoinContext} from '../../store';
import InboxIcon from '@material-ui/icons/Inbox';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import {useHistory} from 'react-router-dom';
function UserContent() {
    const {state} = React.useContext(GitcoinContext);
    const [users] = useGetUsers(state.token);

    const els = users.map((c) => <UserCard key={c.user_id} user={c} />);
    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <Title>Users</Title>
            <Paper>
                <List aria-label="main mailbox folders" style={{padding: 0}}>
                    <div>{els}</div>
                </List>
            </Paper>
        </Container>
    );
}

export default UserContent;

const UserCard = ({user}: {user: User}) => {
    const router = useHistory();

    const navigate = (uid) => {
        router.push(`/users/${user.user_id}`);
    };
    return (
        <ListItem
            button
            style={{borderBottom: '1px solid grey'}}
            onClick={navigate}
        >
            <ListItemIcon>
                <InboxIcon />
            </ListItemIcon>
            <div style={{margin: '0 1rem'}}>
                <Chip
                    avatar={
                        <Avatar
                            alt={user.name}
                            src="/static/images/avatar/1.jpg"
                        />
                    }
                    label={user.badge}
                    color="primary"
                />
            </div>
            <ListItemText>{user.name}</ListItemText>
            <div style={{fontSize: '0.75rem'}}>{user.user_id}</div>
            <div style={{fontSize: '0.75rem', margin: '0 1rem'}}>
                {user.address}
            </div>
            <ListItemText>
                {' '}
                <Chip label={user.status} color="secondary" />
            </ListItemText>
        </ListItem>
    );
};
