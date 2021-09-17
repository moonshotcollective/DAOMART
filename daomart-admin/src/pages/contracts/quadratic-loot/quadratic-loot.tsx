import React from 'react';
import Container from '@material-ui/core/Container';
import {Paper} from '@material-ui/core';
import {GitcoinContext} from '../../../store';
import {useGetQuadraticLootContracts} from '../../../hooks/Contract.hook';
import Title from '../../../components/Title.component';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
const QuadraticLootContractContent = () => {
    const {state, dispatch} = React.useContext(GitcoinContext);

    const [qlootContracts] = useGetQuadraticLootContracts(state.token, {
        chain: state.chain_id,
    });

    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <Title newBtn="/contracts/quadratic-loot/new">
                QuadraticLoot Contracts
            </Title>
            <Paper style={{padding: 16}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Address</TableCell>
                            <TableCell>Chain</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {qlootContracts.map((account, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Typography
                                        variant="overline"
                                        component={'h3'}
                                    >
                                        {account.address}
                                    </Typography>
                                </TableCell>
                                <TableCell>{account.chain}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
};

export default QuadraticLootContractContent;
