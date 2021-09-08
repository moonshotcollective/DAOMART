import NotInterestedIcon from '@material-ui/icons/NotInterested';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
const NoResults = ({msg}: {msg?: string}) => {
    return (
        <Paper
            style={{
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                height: 160,
            }}
        >
            <Paper />
            {msg || 'No Results'}
        </Paper>
    );
};
const Loading = ({loading}: {loading?: boolean}) => {
    return loading ? <CircularProgress /> : null;
};
const BouncyBalls = () => {
    return (
        <div className={'boucny-balls'}>
            <h3 className="loading">Loading</h3>
            <div className={'boucny-balls-wrapper'}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export {BouncyBalls, Loading, NoResults};
