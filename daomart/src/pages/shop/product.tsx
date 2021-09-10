import {useHistory, useParams} from 'react-router-dom';

import {Button, Container, Paper} from '@material-ui/core';
import React from 'react';
import Image from '../../components/Image.component';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {orange} from '@material-ui/core/colors';
import Input from '@material-ui/core/Input';
import {GitcoinContext} from '../../store';
import {formatEther, parseEther} from 'ethers/lib/utils';
import {useGetProduct} from '../../hooks/Shop.hook';
import {
    useGetXByIndex,
    useGetEtherAmountForX,
    useGetCandyAmountForX,
    useGetAllProducts,
    useGetInterestPerBlock,
    useGetCurrentPaid,
    useGetCurrentStreak,
    useGetLastPaidBlock,
    useGetMinMaxStreakInterval,
    useGetCompoundingInterest,
    useGetCoefForId,
    useGetQuantityForId,
} from '../../hooks/ProductContract';
import {
    useGetProductContract,
    useGetTokenContract,
    useGetTokenContractMeta,
} from '../../hooks/Contract.hook';
import {BigNumber, ethers} from 'ethers';
import {useGetCandyAllowance} from '../../hooks/Candy.hook';
import {ACTIONS} from '../../store/actions';
import {useGetBlockNumber} from '../../hooks/Balance';
import {MakeOrder, UpdateOrderStatus} from '../../network/api';
declare const window: any;

const DEFAUL_PHOTO =
    'https://cdn.shopify.com/s/files/1/0258/8924/3182/products/CheetahhoodieFront_1800x1800.png?v=1628875358';

const ProductPage = () => {
    const {state, dispatch} = React.useContext(GitcoinContext);
    const [amountBitByBit, setamountBitByBit] = React.useState(0);

    const [amountBitByBitLoading, setamountBitByBitLoading] =
        React.useState(false);
    const [buyEtherLoading, setBuyEtherLoading] = React.useState(false);
    const [buyCandyLoading, setBuyCandyLoading] = React.useState(false);
    const {pid} = useParams();
    ///
    const [blockNumber, blockNumberLoading] = useGetBlockNumber();
    //
    const [product, loading, err] = useGetProduct(state.token, pid);
    const [contract] = useGetProductContract(product?.contract);
    const [products] = useGetAllProducts(contract);
    const pId = products[product?.code || -1];

    ///
    const refreshTrigger = buyCandyLoading || buyEtherLoading;
    const [currentX] = useGetXByIndex(contract, pId, refreshTrigger);
    const [currentCoef] = useGetCoefForId(contract, pId, refreshTrigger);
    const [currentQuantity] = useGetQuantityForId(
        contract,
        pId,
        refreshTrigger
    );
    const [ethPrice, etherPericeChangeLoading] = useGetEtherAmountForX(
        contract,
        currentX,
        currentCoef,
        refreshTrigger
    );
    const [candyPrice, candyPriceLoading] = useGetCandyAmountForX(
        contract,
        currentX,
        currentCoef,
        refreshTrigger
    );

    // bit by bit
    const [interestForAmount, interestForAmountLoading] =
        useGetInterestPerBlock(
            contract,
            amountBitByBit > 0
                ? ethers.utils.parseEther(amountBitByBit.toString()).toString()
                : null
        );

    const [currentPaid, currentPaidLoading] = useGetCurrentPaid(
        contract,
        pId,
        state.wallets[0],
        amountBitByBitLoading
    );

    const [interestForPaidAmount, interestForPaidAmountLoading] =
        useGetInterestPerBlock(
            contract,
            Number(currentPaid) > 0
                ? ethers.utils.parseEther(currentPaid).toString()
                : null
        );

    const [currentStreak, currentStreakLoading] = useGetCurrentStreak(
        contract,
        pId,
        state.wallets[0],
        amountBitByBitLoading
    );
    const [lastPaidBlock, lastPaidBlockLoading] = useGetLastPaidBlock(
        contract,
        pId,
        state.wallets[0],
        amountBitByBitLoading
    );
    const [minMaxInterval, minMaxIntervalLoading] =
        useGetMinMaxStreakInterval(contract);

    const [compoundingInterest, compoundingInterestLoading] =
        useGetCompoundingInterest(
            contract,
            Number(lastPaidBlock),
            Number(blockNumber),
            Number(currentPaid),
            Number(currentStreak),
            currentCoef
        );

    ///

    /// Candy stuff
    const [contractMeta] = useGetTokenContractMeta(state.token, state.chain_id);
    const [candyContract] = useGetTokenContract(contractMeta);
    const [candyAllowance, candyAllowanceLoading] = useGetCandyAllowance(
        candyContract,
        state.wallets[0],
        contract._address
    );

    const buyWithEther = async () => {
        try {
            const order = await onNewOrder('Full');
            dispatch({type: ACTIONS.AUTHCHECK});
            setBuyEtherLoading(true);
            contract.methods
                .requestMintWithEth(pId, state.wallets[0])
                .send({
                    value: ethers.utils.parseEther(ethPrice),
                    from: state.wallets[0],
                })
                .then((res) => {
                    onUpdateOrderStatus(order?.order_id, 'paid');
                    setBuyEtherLoading(false);
                })
                .catch((err) => {
                    setBuyEtherLoading(false);
                    console.log('err', err);
                });
        } catch (err) {
            setBuyEtherLoading(false);
            console.log('err', err);
        }
    };
    const buyWithCandy = async () => {
        try {
            const order = await onNewOrder('Full');
            dispatch({type: ACTIONS.AUTHCHECK});
            if (candyAllowanceLoading || candyAllowance == null) {
                return;
            }

            const price = ethers.utils.parseEther(candyPrice);

            const parsedAllowence = ethers.utils.parseEther(
                candyAllowance > 1e-2 ? candyAllowance.toString() : '0'
            );
            if (price.gt(parsedAllowence)) {
                setBuyCandyLoading(true);
                await candyContract.methods
                    .approve(contract._address, price)
                    .send({from: state.wallets[0]});
                setBuyCandyLoading(false);
            }
            setBuyCandyLoading(true);
            contract.methods
                .requestMintWithCandy(pId, state.wallets[0], price)
                .send({
                    from: state.wallets[0],
                })
                .then((res) => {
                    onUpdateOrderStatus(order?.order_id, 'paid');
                    dispatch({type: ACTIONS.TRIGGER_CANDY_BALANCE});
                    setBuyCandyLoading(false);
                })
                .catch((err) => {
                    setBuyCandyLoading(false);
                    console.log('err', err);
                });
        } catch (err) {
            setBuyCandyLoading(false);
            console.log('err', err);
        }
    };

    const startPayBitByBit = async () => {
        try {
            dispatch({type: ACTIONS.AUTHCHECK});
            if (
                currentStreakLoading ||
                candyAllowanceLoading ||
                candyAllowance == null ||
                amountBitByBit < 1
            ) {
                return;
            }

            const price = ethers.utils.parseEther(amountBitByBit.toString());

            const parsedAllowence = ethers.utils.parseEther(
                candyAllowance.toString()
            );
            if (price.gt(parsedAllowence)) {
                setamountBitByBitLoading(true);
                await candyContract.methods
                    .approve(contract._address, price)
                    .send({from: state.wallets[0]});
                setamountBitByBitLoading(false);
            }
            setamountBitByBitLoading(true);

            if (Number(currentStreak) > 0) {
                contract.methods
                    .payABit(pId, price)
                    .send({
                        from: state.wallets[0],
                    })
                    .then((res) => {
                        dispatch({type: ACTIONS.TRIGGER_CANDY_BALANCE});
                        setamountBitByBitLoading(false);
                    })
                    .catch((err) => {
                        setamountBitByBitLoading(false);
                        console.log('err', err);
                    });
            } else {
                const order = await onNewOrder('BitByBit');
                contract.methods
                    .buyBitByBit(pId, price)
                    .send({
                        from: state.wallets[0],
                    })
                    .then((res) => {
                        dispatch({type: ACTIONS.TRIGGER_CANDY_BALANCE});
                        setamountBitByBitLoading(false);
                    })
                    .catch((err) => {
                        setamountBitByBitLoading(false);
                        console.log('err', err);
                    });
            }
        } catch (err) {
            setamountBitByBitLoading(false);
            console.log('err', err);
        }
    };

    const onNewOrder = (type: string = 'Full'): Promise<any> => {
        return new Promise((resolve, reject) => {
            if (!product) {
                return;
            }
            MakeOrder(state.token, {item: product.product_id, type: type})
                .then((result) => {
                    if (result.data && result.data.success) {
                        resolve(result.data.data);
                    } else {
                        resolve(null);
                    }
                })
                .catch((err) => {
                    resolve(null);
                    console.log('err', err);
                });
        });
    };
    const onUpdateOrderStatus = (order_id?: string, status?: string) => {
        if (!order_id) {
            return;
        }

        UpdateOrderStatus(state.token, {oid: order_id, status: status})
            .then((result) => {
                console.log('updated order', result.data.data);
            })
            .catch((err) => {
                console.log('err', err);
            });
    };
    if (loading) {
        return <p style={{fontSize: '3rem'}}>Loading</p>;
    }
    if (err) {
        return <p style={{fontSize: '3rem'}}>{JSON.stringify(err)}</p>;
    }
    if (!product) {
        return null;
    }
    return (
        <Container
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                margin: '2rem 0',
                height: '30rem',
            }}
        >
            <Container
                style={{
                    width: '20rem',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 0,
                    height: '30rem',
                }}
            >
                <div
                    className="frame"
                    style={{
                        width: '100%',
                        position: 'relative',
                        height: '100%',
                    }}
                >
                    {' '}
                    <div
                        className="frame-inner"
                        style={{
                            width: '100%',
                            position: 'relative',
                            height: '100%',
                        }}
                    >
                        <Image
                            src={product.avatar || DEFAUL_PHOTO}
                            object-fit={'contain'}
                            alt="DAOMART CLAIM REWARD"
                            layout="fill"
                            className="picture-frame"
                        />
                    </div>
                </div>
            </Container>
            <Container
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '30rem',
                }}
            >
                <Container
                    style={{
                        width: '100%',
                        padding: 0,
                    }}
                >
                    <Typography
                        style={{
                            fontFamily: 'AmericanCaptain',
                            color: orange[300],
                            fontSize: '2rem',
                            textShadow: '1px 1px 3px black',
                            margin: 4,
                        }}
                    >
                        {`${product.category} (${product.type})`}
                    </Typography>

                    <Typography
                        variant={'h3'}
                        style={{
                            fontFamily: 'Franchise',
                            fontSize: '5rem',
                            textShadow: '1px 1px 3px black',
                        }}
                    >
                        {product.name}
                    </Typography>
                </Container>
                <Typography
                    style={{
                        fontFamily: 'MarketDeco',
                    }}
                >
                    {product.description || product.description.length < 10
                        ? FAKE_DESC
                        : product.description}
                </Typography>
                <Container
                    style={{
                        width: '100%',
                        padding: 0,
                        marginTop: 32,
                        marginBottom: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        align="center"
                        variant="body1"
                        component="h3"
                        style={{
                            fontWeight: 'bold',
                            width: '100%',
                            borderBottom: '1px solid black',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {` BUY IN FULL `}{' '}
                        <span
                            style={{fontSize: '0.75rem', color: '#757575'}}
                        >{` CURRENT X IS ${currentX} AND MAX QUANTITY IS ${currentQuantity} WITH COEF OF ${
                            Number(currentCoef || 0) / 1e3
                        }`}</span>
                    </Typography>
                    <Container
                        style={{
                            width: '100%',
                            padding: 0,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                    >
                        <div
                            onClick={() => buyWithEther()}
                            style={{
                                flex: 1,
                                border: '2px solid rgba(40,40,40,.75)',
                                color: 'rgba(40,40,40,1)',
                                borderRadius: 0,
                                fontWeight: 'bolder',

                                fontSize: '1.2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                cursor: 'pointer',
                            }}
                        >
                            <Typography
                                align="center"
                                style={{
                                    backgroundColor: '#ffb74d',
                                    color: 'white',
                                    fontWeight: 'bolder',
                                }}
                            >{` BUY with ETH `}</Typography>
                            <div
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <div
                                    style={{
                                        flex: 1,
                                        color: 'white',

                                        textShadow: '1px 1px 3px grey',
                                        backgroundColor: 'lightseagreen',
                                        padding: 8,
                                        textAlign: 'center',
                                    }}
                                >
                                    {etherPericeChangeLoading ? (
                                        <CircularProgress
                                            size={25}
                                            color="secondary"
                                        />
                                    ) : (
                                        `Ξ ${ethPrice}`
                                    )}
                                </div>
                            </div>

                            <div
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <div
                                    style={{
                                        flex: 1,
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        textShadow: '1px 2px 2px black',
                                        backgroundColor: 'teal',
                                        padding: 8,
                                        borderTop: '1px solid white',
                                        textAlign: 'center',
                                    }}
                                >
                                    {buyEtherLoading ? (
                                        <CircularProgress />
                                    ) : (
                                        `BUY!`
                                    )}
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={() => buyWithCandy()}
                            style={{
                                flex: 1,
                                border: '2px solid rgba(40,40,40,.75)',
                                color: 'rgba(40,40,40,1)',
                                borderRadius: 0,
                                fontWeight: 'bolder',

                                fontSize: '1.2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                cursor: 'pointer',
                            }}
                        >
                            <Typography
                                align="center"
                                style={{
                                    backgroundColor: '#ffb74d',
                                    color: 'white',
                                    fontWeight: 'bolder',
                                }}
                            >{` BUY with CANDY`}</Typography>
                            <div
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <div
                                    style={{
                                        flex: 1,
                                        color: 'white',

                                        textShadow: '1px 1px 3px grey',
                                        backgroundColor: 'hotpink',
                                        padding: 8,
                                        textAlign: 'center',
                                    }}
                                >
                                    {candyPriceLoading ? (
                                        <CircularProgress
                                            size={25}
                                            color="secondary"
                                        />
                                    ) : (
                                        `🍬 ${candyPrice}`
                                    )}
                                </div>
                            </div>
                            <div
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <div
                                    style={{
                                        flex: 1,
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        textShadow: '1px 2px 2px black',
                                        backgroundColor: 'crimson',
                                        padding: 8,
                                        borderTop: '1px solid white',
                                        textAlign: 'center',
                                    }}
                                >
                                    {buyCandyLoading ? (
                                        <CircularProgress />
                                    ) : (
                                        `BUY!`
                                    )}
                                </div>
                            </div>
                        </div>
                    </Container>

                    <Container
                        style={{
                            width: '100%',
                            padding: 0,
                            marginTop: 32,
                            marginBottom: 16,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            align="center"
                            variant="body1"
                            component="h3"
                            style={{
                                fontWeight: 'bold',
                                width: '100%',
                                borderBottom: '1px solid black',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {` BUY  BIT BY BIT `}
                        </Typography>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            <Input
                                style={{
                                    flex: 1,
                                    backgroundColor: '#ffb74d',
                                    color: 'white',
                                    padding: '0 1rem',
                                }}
                                value={amountBitByBit}
                                onChange={(e) =>
                                    Number(e.target.value) > 0
                                        ? setamountBitByBit(
                                              Number(e.target.value)
                                          )
                                        : ''
                                }
                            />

                            <button
                                style={{
                                    textAlign: 'center',
                                    padding: 12,
                                    cursor: 'pointer',
                                    border: '2px solid black',
                                }}
                                onClick={startPayBitByBit}
                            >
                                {amountBitByBitLoading ||
                                currentStreakLoading ? (
                                    <CircularProgress
                                        size={15}
                                        color="secondary"
                                    />
                                ) : !currentStreakLoading &&
                                  Number(currentStreak) > 0 ? (
                                    'PAY A BIT'
                                ) : (
                                    ' START PAYING BIT BY BIT'
                                )}
                            </button>
                        </div>

                        <div>
                            <BitByBitInfoRow
                                title="Interest for new amount added"
                                value={
                                    Number(interestForPaidAmount || 0) +
                                    Number(interestForAmount || 0)
                                }
                                loading={
                                    minMaxIntervalLoading ||
                                    interestForPaidAmountLoading
                                }
                            />
                            <BitByBitInfoRow
                                title="Min Streak Inteval (block)"
                                value={minMaxInterval?.min}
                                subvalue={
                                    lastPaidBlock &&
                                    Number(lastPaidBlock) > 0 &&
                                    minMaxInterval
                                        ? Number(lastPaidBlock) +
                                          minMaxInterval.min
                                        : '---'
                                }
                                loading={minMaxIntervalLoading}
                            />
                            <BitByBitInfoRow
                                title="Max Streak Inteval (block)"
                                value={minMaxInterval?.max}
                                subvalue={
                                    lastPaidBlock &&
                                    Number(lastPaidBlock) > 0 &&
                                    minMaxInterval
                                        ? Number(lastPaidBlock) +
                                          minMaxInterval.max
                                        : '---'
                                }
                                loading={minMaxIntervalLoading}
                            />{' '}
                            <BitByBitInfoRow
                                title="Current Block Number "
                                value={blockNumber}
                                loading={blockNumberLoading}
                            />
                            <BitByBitInfoRow
                                title="Last Paid Block:"
                                value={lastPaidBlock}
                                loading={lastPaidBlockLoading}
                            />
                            <BitByBitInfoRow
                                title="Current Streak:"
                                value={currentStreak}
                                loading={currentStreakLoading}
                            />
                            <BitByBitInfoRow
                                title="Amount Paid:"
                                value={currentPaid}
                                loading={currentPaidLoading}
                            />
                            <BitByBitInfoRow
                                title="Interest Per Block for Amount Paid:"
                                value={interestForPaidAmount}
                                loading={interestForPaidAmountLoading}
                            />
                            <BitByBitInfoRow
                                title=" Total Amount Paid (+Compounding Interst):"
                                value={compoundingInterest}
                                loading={compoundingInterestLoading}
                            />
                        </div>
                    </Container>
                </Container>
            </Container>
        </Container>
    );
};

export default ProductPage;

const FAKE_DESC = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore
magna aliqua. Ut enim ad minim veniam, quis nostrud
exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat. Duis aute irure dolor in
reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur. Excepteur sint occaecat cupidatat
non proident, sunt in culpa qui officia deserunt mollit
anim id est laborum.`;

const BitByBitInfoRow = ({title, value, subvalue, loading}: any) => {
    return (
        <div
            style={{
                width: '100%',
                borderBottom: '1px solid black',
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <div
                style={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '3rem',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                }}
            >
                {title}
            </div>
            <div
                style={{
                    flex: 1,
                    textAlign: 'right',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    height: '3rem',
                }}
            >
                {loading ? (
                    <CircularProgress size={10} color="secondary" />
                ) : Number(value) > 0 ? (
                    value
                ) : (
                    '---'
                )}

                {loading || subvalue == null ? '' : ` (${subvalue})`}
            </div>
        </div>
    );
};
