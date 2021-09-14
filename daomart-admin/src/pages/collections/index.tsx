import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {GitcoinContext} from '../../store';
import Title from '../../components/Title.component';
import {
    Typography,
    Avatar,
    List,
    ListItem,
    FormControl,
    TextField,
} from '@material-ui/core';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import {useHistory} from 'react-router-dom';
import {useTheme} from '@material-ui/core/styles';
import {green, red, blue, pink, cyan} from '@material-ui/core/colors';
import Pagination from '@material-ui/lab/Pagination';

function CollectionContent() {
    const theme = useTheme();
    const {state} = React.useContext(GitcoinContext);
    const [keyword, setKeyword] = React.useState('');
    const [perPage, setPerPage] = React.useState(5);
    const [page, setPage] = React.useState(1);
    const [collections] = [[]];

    const els = collections.map((c: any, i) => (
        <CollectionCard key={c.collection_id} collection={c} i={i} />
    ));

    const onPagiChange = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log('value', value);
        setPage(value);
    };

    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <Title newBtn="/collections/new">Collections</Title>
            <div>
                <form>
                    <FormControl
                        style={{
                            width: '100%',
                            margin: '1rem 0',
                            color: theme.palette.primary.light,
                        }}
                    >
                        <TextField
                            color="primary"
                            autoFocus
                            id="outlined-required"
                            placeholder="Search"
                            name="search"
                            variant="filled"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            inputProps={{
                                style: {
                                    backgroundColor:
                                        theme.palette.primary.light,
                                    padding: theme.spacing(2),
                                },
                            }}
                        />
                    </FormControl>
                </form>
            </div>
            <Paper
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <List
                    aria-label="main mailbox folders"
                    style={{padding: 0, flex: 1}}
                >
                    <div>
                        {els.length ? (
                            els.slice(
                                (page - 1) * perPage,
                                (page - 1) * perPage + perPage
                            )
                        ) : (
                            <ListItem button divider>
                                NO COLLECTIONS FOUNDS
                            </ListItem>
                        )}
                    </div>
                </List>
                <div
                    style={{
                        width: '100%',
                    }}
                >
                    <Pagination
                        style={{
                            width: '100%',
                            marginTop: theme.spacing(2),
                            marginBottom: theme.spacing(2),
                            display: 'flex !important',
                            justifyContent: 'center',
                        }}
                        showFirstButton
                        showLastButton
                        count={Math.ceil(els.length / perPage)}
                        variant="outlined"
                        color="standard"
                        boundaryCount={2}
                        siblingCount={2}
                        page={page}
                        defaultPage={1}
                        onChange={onPagiChange}
                        shape="rounded"
                    />
                </div>
            </Paper>
        </Container>
    );
}

export default CollectionContent;

const CollectionCard = ({collection, i}) => {
    const router = useHistory();

    const navigate = (uid) => {
        router.push(`/collections/${collection.collection_id}`);
    };

    return (
        <ListItem
            button
            divider
            onClick={navigate}
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
            }}
        >
            TODO
        </ListItem>
    );
};

const colors = [red[300], green[300], blue[300], cyan[300], pink[300]];
