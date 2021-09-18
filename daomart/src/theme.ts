import {createTheme, Theme} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';

const theme: Theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            light: '#fff',
            main: '#1245ba',
        },
        text: {
            primary: '#fff',
            secondary: grey[800],
        },
    },
});

export {theme};
