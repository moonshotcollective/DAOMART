import Container from '@material-ui/core/Container';
import {blueGrey, deepOrange, orange} from '@material-ui/core/colors';
import Image from '../../components/Image.component';
import Typography from '@material-ui/core/Typography';
import {GitcoinContext} from '../../store';
import React from 'react';
import BoxPhoto from '../../assets/images/box.png';
import {Input} from '@material-ui/core';
import {
    useGetQuadraticLootContract,
    useGetQuadraticLootContractMeta,
} from '../../hooks/Contract.hook';
import {
    useGetAllTokensMinted,
    useGetTokensURIs,
} from '../../hooks/QuadraticLoot.hook';
import SVG from './f.svg';
const Shop = () => {
    const {state, dispatch} = React.useContext(GitcoinContext);
    const [tokenId, setTokenId] = React.useState('');
    const [err, setErr] = React.useState('');
    const [contractMeta] = useGetQuadraticLootContractMeta(
        state.token,
        state.chain_id
    );
    const [contract] = useGetQuadraticLootContract(contractMeta);

    const [allTokens] = useGetAllTokensMinted(contractMeta);
    const [tokenURIs] = useGetTokensURIs(contract, allTokens);
    console.log('allTokens', contractMeta, allTokens, tokenURIs);
    const onMint = async () => {
        const id = tokenId || Math.floor(Math.random() * 1e4);

        try {
            const f = await contract.methods
                .claim(id)
                .send({from: state.wallets[0]});
            console.log('f', f);
        } catch (err) {
            console.log('err', err);
        }
    };

    return (
        <Container>
            <Container
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    margin: '2rem 0',
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
                                fontFamily: 'AmericanCaptain',
                                fontSize: '2rem',
                                color: blueGrey['100'],
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
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Input
                            type="number"
                            style={{
                                backgroundColor: orange['A400'],
                                padding: '0.5rem',
                                color: 'white',
                                textAlign: 'center',
                                border: '1px solid black',
                            }}
                            placeholder="Enter Token ID"
                            value={tokenId}
                            onChange={(e) =>
                                setTokenId(parseInt(e.target.value).toString())
                            }
                        />
                        <button onClick={onMint}>
                            <p>MINT NOW</p>
                        </button>
                    </Container>
                </Container>
            </Container>
            <Container
                style={{
                  
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    padding: 0,
                }}
            >
                {tokenURIs
                    ? tokenURIs.map((t, i) => (
                          <TokenCard key={i} token={t} contract={contract} />
                      ))
                    : null}
            </Container>
        </Container>
    );
};

export default Shop;
const FAKE_DESC = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore
magna aliqua. Ut enim ad minim veniam, quis nostrud
exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat. Duis aute irure dolor in
reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur. Excepteur sint occaecat cupidatat
non proident, sunt in culpa qui officia deserunt mollit
anim id est laborum.`;

const TokenCard = ({token, contract}) => {
    const dataURI = token.image;
    const json = atob(dataURI.substring(29));
    const result = JSON.parse(json);
    console.log('result', token);

    return (
        <div>
            <p>{token.address}</p>

            <img src={result.image} width="400" height="400" />
        </div>
    );
};
