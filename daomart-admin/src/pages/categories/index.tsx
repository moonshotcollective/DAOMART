import React from 'react';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import Title from '../../components/Title.component';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import {useGetProductCategories} from '../../hooks/Product.hook';
import {GitcoinContext} from '../../store';
import {useTheme} from '@material-ui/core/styles';
import {green, red, blue, pink, cyan} from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import {useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import Pagination from '@material-ui/lab/Pagination';
function CategoryContent() {
    const theme = useTheme();
    const {state} = React.useContext(GitcoinContext);
    const [keyword, setKeyword] = React.useState('');
    const [perPage, setPerPage] = React.useState(5);
    const [page, setPage] = React.useState(1);
    const [categories] = useGetProductCategories(state.token, {
        keyword: keyword,
    });

    const els = categories.map((c, i) => (
        <CategoryCard key={c.category_id} category={c} i={i} />
    ));
    const onPagiChange = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log('value', value);
        setPage(value);
    };

    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <Title newBtn="/categories/new">Categories</Title>
            <div>
                <form>
                    <FormControl
                        style={{
                            width: '100%',
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
                    {els.length ? (
                        els.slice(
                            (page - 1) * perPage,
                            (page - 1) * perPage + perPage
                        )
                    ) : (
                        <ListItem button divider>
                            NO CATEGORIES FOUNDS
                        </ListItem>
                    )}
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

export default CategoryContent;

const CategoryCard = ({category, i}) => {
    const router = useHistory();

    const navigate = () => {
        router.push(`/categories/${category.category_id}`);
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
            <div style={{width: '7rem'}}>
                <Avatar
                    variant="rounded"
                    alt={'category'}
                    src={category.avatar}
                    style={{
                        width: '7rem',
                        height: '7rem',
                        objectFit: 'contain',
                        backgroundColor: colors[i % colors.length],
                    }}
                >
                    {category.avatar ? null : (
                        <PhotoSizeSelectActualIcon fontSize="large" />
                    )}
                </Avatar>
            </div>

            <div
                style={{
                    marginLeft: 8,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="overline" style={{lineHeight: '1rem'}}>
                    {category.category_id}
                </Typography>
                <Typography variant="caption">{category.type}</Typography>
                <Typography variant="body1" style={{fontSize: '1.5rem'}}>
                    {category.name}
                </Typography>
                <Typography variant="subtitle2">
                    {category.description}
                </Typography>{' '}
                <Typography variant="subtitle2">
                    {category.tags.join(' ,')}
                </Typography>
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
