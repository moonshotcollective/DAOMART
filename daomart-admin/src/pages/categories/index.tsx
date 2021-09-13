import React from 'react';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import Title from '../../components/Title.component';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import {useGetProductCategories} from '../../hooks/Product.hooks';
import {GitcoinContext} from '../../store';
import {useTheme} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
function CategoryContent() {
    const theme = useTheme();
    const {state} = React.useContext(GitcoinContext);
    const [keyword, setKeyword] = React.useState('');
    const [categories] = useGetProductCategories(state.token, {
        keyword: keyword,
    });

    const els = categories.map((c) => (
        <CategoryCard key={c.category_id} category={c} />
    ));

    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <Title newBtn="/categories/new">Categories</Title>
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
            <Paper style={{maxHeight: '70vh', overflow: 'auto'}}>
                <List aria-label="main mailbox folders" style={{padding: 0}}>
                    <ListItem button divider>
                        NO CATEGORIES FOUNDS
                    </ListItem>
                    <div>{els}</div>
                </List>
            </Paper>
        </Container>
    );
}

export default CategoryContent;

const CategoryCard = ({category}) => {
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
                    }}
                >
                    {category.avatar ? null : (
                        <PhotoSizeSelectActualIcon fontSize="large" />
                    )}
                </Avatar>
            </div>

            <div style={{marginLeft: 8, height: '100%'}}>
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
