import ListItem, {ListItemProps} from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
const NetworkLogComponent = ({logs}: {logs: NetworkLog[]}) => {
    const els = logs.map((c, i) => <HttpLogCard key={i} log={c} />);

    return (
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Method</TableCell>
                    <TableCell>Route</TableCell>
                    <TableCell>IP</TableCell>
                    <TableCell>geolocation</TableCell>
                    <TableCell>user</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>{els}</TableBody>
        </Table>
    );
};

export {NetworkLogComponent};
const HttpLogCard = ({log}: {log: NetworkLog}) => {
    return (
        <TableRow>
            <TableCell>
                <Typography variant="overline">{log.type}</Typography>
            </TableCell>
            <TableCell>{log.method}</TableCell>
            <TableCell>{log.route}</TableCell>
            <TableCell>{log.ip}</TableCell>
            <TableCell>{log.geolocation}</TableCell>
            <TableCell>{log.user}</TableCell>
        </TableRow>
    );
};
