import * as React from 'react';
import {useTheme} from '@material-ui/core/styles';

import Title from './Title.component';

// Generate Sales Data
function createData(time: string, amount?: number) {
    return {time, amount};
}

export default function Chart() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Title>Today</Title>
            CHART
        </React.Fragment>
    );
}
