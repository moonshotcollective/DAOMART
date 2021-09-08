import React from 'react';

import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Title from '../../components/Title.component';
import {useGetProductCategories} from '../../hooks/Shop.hooks';
import {GitcoinContext} from '../../store';

function CategoryContent() {
    const {state} = React.useContext(GitcoinContext);
    const [categories] = useGetProductCategories(state.token);
    console.log('categories', categories);
    const els = categories.map((c) => (
        <CategoryCard key={c.category_id} category={c} />
    ));
    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <Title newBtn="/categories/new">Categories</Title>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Tags</TableCell>
                            <TableCell align="left">Product Count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{els}</TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default CategoryContent;

const CategoryCard = ({category}) => {
    return (
        <TableRow>
            <TableCell component="th" scope="row">
                {category.type}
            </TableCell>
            <TableCell align="left">{category.name}</TableCell>
            <TableCell align="left">{category.productCount}</TableCell>

            <TableCell align="left">{category.tags}</TableCell>
        </TableRow>
    );
};
