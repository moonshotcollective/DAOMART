import Container from '@material-ui/core/Container';
import Image from '../../components/Image.component';
import GitcoinPhoto from '../../assets/images/about.png';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
const Claim = () => {
    return (
        <Container
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingTop: 32,
            }}
        >
            <Image
                src={GitcoinPhoto}
                object-fit={'contain'}
                alt="DAOMART CLAIM REWARD"
            />
            <Container style={{flex: 0, padding: 32, margin: 0}}>
                <Typography className="custom-font DeterminationMWR">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </Typography>
            </Container>
        </Container>
    );
};

export default Claim;
