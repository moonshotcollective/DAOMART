import React from 'react';
import Container from '@material-ui/core/Container';
import Title from '../../../components/Title.component';
import {Paper} from '@material-ui/core';
import {GitcoinContext} from '../../../store';
import {useParams} from 'react-router-dom';
import {
    useGetCoefForId,
    useGetEtherAmountForX,
    useGetProductContract,
    useGetProductContractItems,
    useGetProductJar,
    useGetProductQueue,
    useGetQueueIndexForAddress,
    useGetRemaningAmountForQueueIndex,
    useGetX,
} from './../../../hooks/ProductContract.hook';
import {Button} from '@material-ui/core';
import {ethers} from 'ethers';
import {
    useGetCandyAllowance,
    useGetCandyContract,
    useGetTokenContractMeta,
} from '../../../hooks/Candy.hook';

const ProductContractPanel = () => {
    const {state, dispatch} = React.useContext(GitcoinContext);
    const {cid} = useParams();

    const [candyMetadata] = useGetTokenContractMeta(
        state.token,
        state.chain_id
    );
    const [candyContract] = useGetCandyContract(candyMetadata?.address);
    const [allowance] = useGetCandyAllowance(
        candyContract,
        state.wallets[0],
        cid
    );

    const [contract] = useGetProductContract(cid);
    const [contractItems] = useGetProductContractItems(contract);
    const currentProductId = contractItems[0];
    const [jar] = useGetProductJar(contract, currentProductId);
    const [q] = useGetProductQueue(contract, currentProductId);
    const [x] = useGetX(contract, currentProductId);
    const [etherPrice] = useGetEtherAmountForX(contract, currentProductId, x);
    const [coef] = useGetCoefForId(contract, currentProductId);
    // console.log('contract jars', x, jar, etherPrice);
    // console.log('q', q);
    React.useEffect(() => {
        if (contract && currentProductId) {
            contract.methods
                .getRelase(currentProductId)
                .call()
                .then(console.log)
                .catch(console.log);
        }
    }, [contract, contractItems]);
    const onBuy = async () => {
        try {
            contract.methods
                .requestMintWithEth(currentProductId)
                .send({
                    from: state.wallets[0],
                    value: ethers.utils.parseEther(etherPrice || '1'),
                })
                .then(console.log)
                .catch(console.log);
        } catch (err) {
            console.log('err', err);
        }
    };
    const onGetInLine = async (amount_: string = '100') => {
        try {
            if (!candyContract) {
                return;
            }
            let amount = ethers.utils.parseEther(amount_);
            if (
                amount.gt(ethers.utils.parseEther(allowance?.toString() || '0'))
            ) {
                await candyContract.methods
                    .approve(cid, amount)
                    .send({from: state.wallets[0]});
            }
            contract.methods
                .getInLine(currentProductId, amount)
                .send({
                    from: state.wallets[0],
                })
                .then(console.log)
                .catch(console.log);
        } catch (err) {
            console.log('err', err);
        }
    };
    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <Title>Product Contract {cid}</Title>

            <Paper style={{padding: 16}}>
                <Button onClick={onBuy}>BUY WITH ETH</Button>
                <Button onClick={() => onGetInLine()}>GET IN LINE</Button>

                <div>
                    {q.map((addr) => (
                        <QueueCard
                            contract={contract}
                            productId={currentProductId}
                            addr={addr}
                        />
                    ))}
                </div>
            </Paper>
        </Container>
    );
};

export default ProductContractPanel;

const QueueCard = ({contract, productId, addr}) => {
    console.log('addr123', addr);
    const [qIndex] = useGetQueueIndexForAddress(contract, productId, addr);
    const [remainingAMount] = useGetRemaningAmountForQueueIndex(
        contract,
        productId,
        qIndex ? qIndex['1'] : null
    );
    return (
        <div>
            <div>{addr}</div>
            <div>{qIndex?.toString()}</div>
            <div>{remainingAMount}</div>
        </div>
    );
};
