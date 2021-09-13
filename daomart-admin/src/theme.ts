import {createTheme, Theme} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';

const theme: Theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            light: 'white',
            main: '#1245ba',
        },
    },
});

export {theme};
