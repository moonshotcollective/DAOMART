import Carousel from '../../components/carousel';
import Container from '@material-ui/core/Container';
import {blueGrey, deepOrange, orange} from '@material-ui/core/colors';
import {Button} from '@material-ui/core';
import Image from '../../components/Image.component';
import Typography from '@material-ui/core/Typography';
import {GitcoinContext} from '../../store';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {useGetProducts} from '../../hooks/Shop.hook';

const Shop = () => {
    const {state, dispatch} = React.useContext(GitcoinContext);

    const [products] = useGetProducts(state.token);
    console.log('products', products);
    return (
        <Container>
            <Container style={{padding: '1rem 0'}}>
                <Carousel products={products} />
            </Container>

            <Container style={{padding: '1rem 0'}}>
                <div
                    style={{
                        margin: '2rem 0',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}
                >
                    <div
                        style={{
                            width: '15rem',
                            height: '15rem',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <p
                            style={{
                                fontFamily: 'AmericanCaptain',
                                color: blueGrey[200],
                                fontSize: '5rem',
                                textShadow: '3px 1px 5px black',
                            }}
                        >
                            KUDOS
                        </p>
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                border: '1rem solid ' + blueGrey[300],
                                transform: 'rotate(45deg)',
                                boxShadow: ' inset  0 0 8px 2px black',
                            }}
                        ></div>
                    </div>
                    <div
                        style={{
                            width: '15rem',
                            height: '15rem',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <p
                            style={{
                                fontFamily: 'AmericanCaptain',
                                color: deepOrange[300],
                                fontSize: '5rem',
                                textShadow: '3px 1px 5px black',
                            }}
                        >
                            {' '}
                            MERCH
                        </p>
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                border: '1rem solid ' + deepOrange.A100,
                                transform: 'rotate(45deg)',
                                boxShadow: ' inset  0 0 8px 2px black',
                            }}
                        ></div>
                    </div>
                    <div
                        style={{
                            width: '15rem',
                            height: '15rem',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <p
                            style={{
                                fontFamily: 'AmericanCaptain',
                                color: orange[300],
                                fontSize: '5rem',
                                textShadow: '3px 1px 5px black',
                            }}
                        >
                            NFT
                        </p>
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                border: '1rem solid ' + orange.A200,
                                transform: 'rotate(45deg)',
                                boxShadow: ' inset  0 0 8px 2px black',
                            }}
                        ></div>
                    </div>
                </div>
            </Container>

            <Container
                style={{
                    padding: '1rem 0',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '2rem 0 ',
                    flexWrap: 'wrap',
                }}
            >
                {(products || []).map((p) => (
                    <ProductCard item={p} key={p.product_id} />
                ))}
            </Container>
        </Container>
    );
};

export default Shop;

const ProductCard = ({item}) => {
    const c = [
        deepOrange[300],
        blueGrey[200],
        orange[500],
        blueGrey[700],
        orange.A400,
        deepOrange.A400,
    ][Math.floor(Math.random() * 3)];

    const router = useHistory();

    const navigate = (path) => {
        router.push(path);
    };
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                margin: ' 0.5rem ',
                border: '1px solid black',
            }}
        >
            <Container
                style={{
                    width: '20rem',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 0,
                }}
            >
                <Container
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderBottom: '1px solid black',
                        height: '10rem',
                        margin: 0,
                        backgroundColor: c,
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            position: 'relative',
                            height: '100%',

                            padding: 8,
                        }}
                        className="img-container"
                    >
                        <Image
                            src={item.avatar || DEFAUL_PHOTO}
                            object-fit={'contain'}
                            alt="DAOMART CLAIM REWARD"
                            className="picture-frame"
                        />
                    </div>
                </Container>

                <Container
                    style={{
                        width: '100%',
                        padding: 0,
                        margin: '1rem 0',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                >
                    <Container
                        style={{
                            padding: 8,
                        }}
                    >
                        <Typography
                            variant={'h6'}
                            style={{
                                fontFamily: 'Roboto',
                                textShadow: '1px 1px 3px black',
                                fontWeight: 'bold',
                            }}
                        >
                            {item.name}
                        </Typography>
                        <Typography
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: '0.75rem',
                                textShadow: '1px 1px 3px black',
                            }}
                        >
                            {`${item.category} (${item.type})`}
                        </Typography>
                    </Container>
                    <Button
                        style={{
                            alignSelf: 'flex-end',

                            border: '2px solid rgba(40,40,40,.75)',
                            color: 'rgba(40,40,40,1)',
                            borderRadius: 0,
                            fontWeight: 'bolder',
                            fontFamily: 'Bazar',
                            fontSize: '1rem',

                            margin: '0 1rem',
                        }}
                        onClick={() => navigate('/shop/' + item.product_id)}
                    >
                        BUY
                    </Button>
                </Container>
            </Container>
        </div>
    );
};

const DEFAUL_PHOTO =
    'https://cdn.shopify.com/s/files/1/0258/8924/3182/products/CheetahhoodieFront_1800x1800.png?v=1628875358';
