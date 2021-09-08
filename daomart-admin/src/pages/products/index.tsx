import React from 'react';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useGetProducts} from '../../hooks/Shop.hooks';
import {GitcoinContext} from '../../store';
import Title from '../../components/Title.component';
function ProductContent() {
    const {state} = React.useContext(GitcoinContext);
    const [products] = useGetProducts(state.token);

    const els = products.map((c) => (
        <ProductCard key={c.product_id} product={c} />
    ));
    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <Title newBtn="/products/new">Products</Title>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Code</TableCell>
                            <TableCell align="left">X</TableCell>
                            <TableCell align="left">Price (Eth)</TableCell>
                            <TableCell align="left">Price (Candy)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{els}</TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default ProductContent;

const ProductCard = ({product}) => {
    const productMeta: any = {};
    return (
        <TableRow>
            <TableCell scope="row">{product.type}</TableCell>
            <TableCell scope="row">{product.category}</TableCell>
            <TableCell align="left">{product.name}</TableCell>
            <TableCell align="left">{product.code}</TableCell>
            <TableCell align="left">{productMeta.x || '---'}</TableCell>
            <TableCell align="left">
                {productMeta.candyAmount || '---'}
            </TableCell>
            <TableCell align="left">
                {productMeta.etherAmount || '---'}
            </TableCell>
        </TableRow>
    );
};
