import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {useGetProducts} from '../../hooks/Product.hook';
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

function ProductContent() {
    const theme = useTheme();
    const {state} = React.useContext(GitcoinContext);
    const [keyword, setKeyword] = React.useState('');
    const [perPage, setPerPage] = React.useState(5);
    const [page, setPage] = React.useState(1);
    const [products] = useGetProducts(state.token);

    const els = products.map((c, i) => (
        <ProductCard key={c.product_id} product={c} i={i} />
    ));

    const onPagiChange = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log('value', value);
        setPage(value);
    };

    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <Title newBtn="/products/new">Products</Title>
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
                                NO PRODUCTS FOUNDS
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
                        // onRowsPerPageChange={
                        //     onRowsPerChange
                        // }
                    />
                </div>
            </Paper>
        </Container>
    );
}

export default ProductContent;

const ProductCard = ({product, i}) => {
    const router = useHistory();

    const navigate = (uid) => {
        router.push(`/products/${product.product_id}`);
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
                    alt={'product'}
                    src={product.avatar}
                    style={{
                        width: '7rem',
                        height: '7rem',
                        objectFit: 'contain',
                        backgroundColor: colors[i % colors.length],
                    }}
                >
                    {product.avatar ? null : (
                        <PhotoSizeSelectActualIcon fontSize="large" />
                    )}
                </Avatar>
            </div>

            <div style={{marginLeft: 8, height: '100%'}}>
                <Typography variant="overline" style={{lineHeight: '1rem'}}>
                    {product.product_id}
                </Typography>
                <Typography variant="caption">{product.type}</Typography>
                <Typography variant="caption">{product.category}</Typography>
                <Typography variant="caption">{product.contract}</Typography>
                <Typography variant="caption">{product.code}</Typography>
                <Typography variant="body1" style={{fontSize: '1.5rem'}}>
                    {product.name}
                </Typography>
                <Typography variant="subtitle2">
                    {product.description}
                </Typography>
                <Typography variant="subtitle2">
                    {product.tags.join(' ,')}
                </Typography>
            </div>
        </ListItem>
    );
};

const colors = [red[300], green[300], blue[300], cyan[300], pink[300]];
