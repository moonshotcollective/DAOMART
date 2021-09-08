import {Button, Container, Paper} from '@material-ui/core';
import React from 'react';
import {useEmblaCarousel} from 'embla-carousel/react';
import Image from './Image.component';
import Typography from '@material-ui/core/Typography';

import {orange} from '@material-ui/core/colors';
import {useHistory} from 'react-router-dom';
const DEFAUL_PHOTO =
    'https://cdn.shopify.com/s/files/1/0258/8924/3182/products/CheetahhoodieFront_1800x1800.png?v=1628875358';

export type Props = {
    products?: any[];
};
const Carousel = ({products}: Props) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({loop: true});

    const els = (products || []).map((c) => (
        <CarouselItem key={c.product_id} item={c} />
    ));
    React.useEffect(() => {
        if (emblaApi) {
            // Embla API is ready
        }
    }, [emblaApi]);

    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">{els}</div>
        </div>
    );
};
export default Carousel;

const CarouselItem = ({item}) => {
    const router = useHistory();

    const navigate = (path) => {
        router.push('/shop/' + item.product_id);
    };
    return (
        <div className="embla__slide" style={{}}>
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
                                src={item.avatar || DEFAUL_PHOTO}
                                alt="DAOMART CLAIM REWARD"
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
                            {`${item.category} (${item.type})`}
                        </Typography>

                        <Typography
                            variant={'h3'}
                            style={{
                                fontFamily: 'Franchise',
                                fontSize: '5rem',
                                textShadow: '1px 1px 3px black',
                            }}
                        >
                            {item.name}
                        </Typography>
                    </Container>
                    <Typography
                        style={{
                            fontFamily: 'MarketDeco',
                        }}
                    >
                        {item.description || item.description.length < 10
                            ? FAKE_DESC
                            : item.description}
                    </Typography>
                    <Container
                        style={{
                            width: '100%',
                            padding: 0,
                            margin: '1rem 0',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Button
                            style={{
                                alignSelf: 'flex-end',
                                width: '10rem',
                                border: '2px solid rgba(40,40,40,.75)',
                                color: 'rgba(40,40,40,1)',
                                borderRadius: 0,
                                fontWeight: 'bolder',
                                fontFamily: 'Bazar',
                                fontSize: '2rem',
                                padding: '0',
                                margin: ' 0 1rem ',
                            }}
                            onClick={navigate}
                        >
                            READ MORE
                        </Button>
                    </Container>
                </Container>
            </Container>
        </div>
    );
};
const FAKE_DESC = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore
magna aliqua. Ut enim ad minim veniam, quis nostrud
exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat. Duis aute irure dolor in
reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur. Excepteur sint occaecat cupidatat
non proident, sunt in culpa qui officia deserunt mollit
anim id est laborum.`;
