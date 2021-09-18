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

    return (
        <div>
            <Container
                style={{
                    padding: '1rem 0',
                    height: '40rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant="h2"
                    component="h2"
                    style={{
                        fontWeight: 'bold',
                        fontSize: '8rem',
                        color: ' black',
                    }}
                    align="center"
                >
                    image here
                </Typography>
            </Container>

            <div
                style={{
                    padding: '3rem 0',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '2rem',
                    flexWrap: 'wrap',
                    backgroundColor: 'white',
                }}
            >
                {(products || []).map((p) => (
                    <ProductCard item={p} key={p.product_id} />
                ))}
            </div>
        </div>
    );
};

export default Shop;

const ProductCard = ({item}) => {
    const router = useHistory();

    const navigate = (path) => {
        router.push(path);
    };
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '1rem ',
                boxShadow: '1px 1px 10px 0 #467394',
                height: '24rem',
                width: '19.5rem',
                backgroundColor: '#62BDFF',
                borderRadius: '1rem',
                cursor: 'pointer',
            }}
            onClick={() => navigate('/shop/product/' + item.product_id)}
        >
            <Container
                style={{
                    flex: 1,
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
                        justifyContent: 'center',
                        flex: 1,
                        margin: 0,
                        padding: '1rem 2rem 0',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            position: 'relative',
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
                        height: '6rem',
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography
                        align="center"
                        variant={'h5'}
                        component="p"
                        style={{
                            letterSpacing: 2,
                            fontSize: '2rem',
                            fontWeight: 400,
                            textShadow: '1px 1px 1px #999',
                        }}
                    >
                        {item.name}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        align="center"
                        style={{
                            fontSize: '0.75rem',
                            textShadow: '1px 1px 1px #999',
                            color: '#eaeaea',
                        }}
                    >
                        {`${item.category}`}
                    </Typography>
                    <Typography
                        align="center"
                        style={{
                            fontSize: '0.75rem',
                            textShadow: '1px 1px 1px #999',
                            color: '#eaeaea',
                        }}
                    >
                        {`Release ${new Date().toLocaleDateString()}`}
                    </Typography>
                </Container>
            </Container>
        </div>
    );
};

const DEFAUL_PHOTO =
    'https://cdn.shopify.com/s/files/1/0258/8924/3182/products/CheetahhoodieFront_1800x1800.png?v=1628875358';
