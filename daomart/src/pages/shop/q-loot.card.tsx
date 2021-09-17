import React from 'react';
import {Button, Container} from '@material-ui/core';
import Image from '../../components/Image.component';
import Typography from '@material-ui/core/Typography';
import {orange} from '@material-ui/core/colors';
import {useHistory} from 'react-router-dom';
import BoxPhoto from '../../assets/images/box.png';
export const QuadraticLootCard = ({}) => {
    const router = useHistory();

    const navigate = () => {
        router.push('/shop/quadratic-loot');
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
                        style={{
                            width: '100%',
                            position: 'relative',
                            height: '100%',
                        }}
                    >
                        <Image
                            src={BoxPhoto}
                            alt="DAOMART CLAIM REWARD"
                            className="picture-frame"
                        />
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
                            variant={'h3'}
                            style={{
                                fontFamily: 'Franchise',
                                fontSize: '1rem',
                                textShadow: '1px 1px 3px black',
                            }}
                        >
                            {`Quadratic Loot Box`}
                        </Typography>

                        <Typography
                            style={{
                                fontFamily: 'AmericanCaptain',
                                color: orange[300],
                                fontSize: '5rem',
                                textShadow: '1px 3px 3px black',
                            }}
                        >
                            {'Quadratic Loot #1'}
                        </Typography>
                    </Container>
                    <Typography
                        style={{
                            fontFamily: 'MarketDeco',
                        }}
                    >
                        {FAKE_DESC}
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
                        <button className="sign-btn" onClick={navigate}>
                            <p>MINT NOW</p>
                        </button>
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
