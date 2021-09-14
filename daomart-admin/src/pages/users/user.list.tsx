import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {useGetUsers} from '../../hooks/User.hook';
import {GitcoinContext} from '../../store';
import InboxIcon from '@material-ui/icons/Inbox';
import Avatar from '@material-ui/core/Avatar';
import {useHistory} from 'react-router-dom';
import PeopleIcon from '@material-ui/icons/People';
import {Typography, Chip, Link} from '@material-ui/core';
import {red, green, blue, cyan, pink} from '@material-ui/core/colors';
function UserListComponent({users}: {users: User[]}) {
    const [perPage, setPerPage] = React.useState(5);
    const [page, setPage] = React.useState(1);
    const els = users.map((c, i) => (
        <UserCard key={c.user_id} user={c} i={i} />
    ));
    return (
        <List aria-label="main mailbox folders" style={{padding: 0}}>
            <div>
                {' '}
                {els.length ? (
                    els.slice(
                        (page - 1) * perPage,
                        (page - 1) * perPage + perPage
                    )
                ) : (
                    <ListItem button divider>
                        NO USERS FOUNDS
                    </ListItem>
                )}
            </div>
        </List>
    );
}

export default UserListComponent;

const UserCard = ({user, i}) => {
    const router = useHistory();

    const navigate = () => {
        router.push(`/users/${user.user_id}`);
    };

    return (
        <ListItem
            button
            divider
            onClick={navigate}
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch',
            }}
        >
            <div style={{width: '7rem'}}>
                <Avatar
                    variant="rounded"
                    alt={'user'}
                    src={user.avatar}
                    style={{
                        width: '7rem',
                        height: '7rem',
                        objectFit: 'contain',
                        backgroundColor: colors[i % colors.length],
                    }}
                >
                    {user.avatar ? null : <PeopleIcon fontSize="large" />}
                </Avatar>
            </div>

            <div
                style={{
                    flex: 1,
                    margin: '0 0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="overline" style={{lineHeight: '1rem'}}>
                    {user.user_id}
                </Typography>

                <Typography
                    variant="body1"
                    style={{
                        fontSize: '1.5rem',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                >
                    {user.name}
                    <Link variant="overline" style={{paddingLeft: 8}}>
                        {user.address}
                    </Link>
                </Typography>

                <div>
                    <Chip label={user.status} color="secondary" />
                    <Chip label={user.badge} color="primary" />
                </div>
            </div>

            <div style={{display: 'flex', alignItems: 'center'}}>
                <div
                    style={{
                        padding: '0.5rem 1rem',
                        color: 'white',
                        backgroundColor: '#aaa',
                        borderRadius: 6,
                        fontSize: '0.7rem',
                    }}
                >
                    OFFLINE
                </div>
            </div>
        </ListItem>
    );
};

const colors = [
    red['A100'],
    green['A100'],
    blue['A100'],
    cyan['A100'],
    pink['A100'],
];
