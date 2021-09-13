import React from 'react';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useGetProducts} from '../../hooks/Product.hooks';
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
function ProductContent() {
    const theme = useTheme();
    const {state} = React.useContext(GitcoinContext);
    const [keyword, setKeyword] = React.useState('');
    const [products] = useGetProducts(state.token);

    const els = products.map((c) => (
        <ProductCard key={c.product_id} product={c} />
    ));
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

export default ProductContent;

const ProductCard = ({product}) => {
    const router = useHistory();

    const navigate = (uid) => {
        router.push(`/products/${product.product_id}`);
    };
    console.log('product', product);
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
