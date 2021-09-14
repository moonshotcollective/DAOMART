import React from 'react';

import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Title from '../../components/Title.component';
import {GitcoinContext} from '../../store';
import InboxIcon from '@material-ui/icons/Inbox';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import {useHistory} from 'react-router-dom';
import {useSubToMembers} from '../../network/socket';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
function UserContent() {
    const {state} = React.useContext(GitcoinContext);
    const [users] = useSubToMembers(state.token);

    const els = users
        ? users.map((c, i) => <UserCard key={c.user_id + i} user={c} />)
        : [];
    console.log('users', users);
    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <Title>
                Lobby{' '}
                <Chip
                    icon={<PersonIcon />}
                    label={`${els.length} members online`}
                    color="primary"
                />
            </Title>
            <Paper>
                <List aria-label="main mailbox folders" style={{padding: 0}}>
                    {els.length ? (
                        els
                    ) : (
                        <div
                            style={{
                                marginTop: 16,
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                padding: 8,
                            }}
                        >
                            <Typography
                                style={{
                                    margin: 32,
                                    textAlign: 'center',
                                    padding: 32,
                                    border: '1px solid black',
                                }}
                            >
                                No ones here yet
                            </Typography>
                        </div>
                    )}
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
                <PersonIcon />
            </ListItemIcon>

            <ListItemText>{user.name}</ListItemText>
            <div style={{fontSize: '0.75rem'}}>{user.user_id}</div>
            <div style={{fontSize: '0.75rem', margin: '0 1rem'}}>
                {user.address}
            </div>
        </ListItem>
    );
};
