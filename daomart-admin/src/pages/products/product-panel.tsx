import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useGetProductById} from '../../hooks/Product.hook';
import {GitcoinContext} from '../../store';
import Chip from '@material-ui/core/Chip';
import Title from '../../components/Title.component';
import {Button, Paper, Divider} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import {UpdateProductStatus} from '../../network/api';
import {useGetOrdersByProduct} from '../../hooks/Order.hook';
function ProductPanelPage() {
    const {state} = React.useContext(GitcoinContext);
    const [trigger, setTrigger] = React.useState(false);

    const {pid} = useParams();
    const [product] = useGetProductById(state.token, pid, trigger);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <Title>Product Panel</Title>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                >
                    <Tab label="Product Card" {...a11yProps(0)} />
                    <Tab label="Orders" {...a11yProps(1)} />
                    <Tab label="Activity" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <ProductTabContent
                value={value}
                index={0}
                product={product}
                token={state.token}
                onTrigger={() => setTrigger(!trigger)}
            />
            <OrderTabContent
                value={value}
                index={1}
                product={product}
                token={state.token}
            />
            <ActivityTabContent value={value} index={2} product={product} />
        </Container>
    );
}

export default ProductPanelPage;

const ProductTabContent = ({
    value,
    index,
    product,
    token,
    onTrigger,
}: {
    value: number;
    index: number;
    product: Product | null;
    token: string | null;
    onTrigger: any;
}) => {
    const onStatusChange = (status) => {
        try {
            if (!token || !product) {
                return;
            }
            UpdateProductStatus(token, product.product_id, status)
                .then((result) => {
                    onTrigger();
                    console.log('result', result);
                })
                .catch((err) => {
                    console.log('err', err);
                });
        } catch (err) {
            console.log('err', err);
        }
    };
    return (
        <TabPanel value={value} index={index}>
            <div style={{minHeight: 480}}>
                <div style={{padding: 8}}>
                    <Typography variant="overline" component={'h6'}>
                        {product?.product_id}
                    </Typography>{' '}
                    <Typography variant="overline" component={'h3'}>
                        {product?.name}
                    </Typography>
                    <div>
                        <Typography variant="body1" component="span">
                            <Link variant="overline">
                                {`${product?.contract}`}
                            </Link>{' '}
                            <Link variant="overline">
                                {`(#${product?.code})`}
                            </Link>
                        </Typography>
                    </div>{' '}
                    <div>
                        <MyChip label={product?.type} />
                    </div>
                </div>
                <div style={{padding: 8}}>ACTIONS</div>
            </div>
        </TabPanel>
    );
};
const OrderTabContent = ({value, index, product, token}) => {
    const activeProducts = useGetOrdersByProduct(token, product?.product_id);
    return (
        <TabPanel value={value} index={index}>
            <div style={{minHeight: 480}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Event</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Timestamp</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activeProducts.map((account, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Typography
                                        variant="overline"
                                        component={'h3'}
                                    >
                                        TODO
                                    </Typography>
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </TabPanel>
    );
};
const ActivityTabContent = ({value, index, product}) => {
    const activeProducts = [];
    return (
        <TabPanel value={value} index={index}>
            <div style={{minHeight: 480}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Event</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Timestamp</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activeProducts.map((account, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Typography
                                        variant="overline"
                                        component={'h3'}
                                    >
                                        TODO
                                    </Typography>
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </TabPanel>
    );
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const a11yProps = (index: any) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

const TabPanel = (props: TabPanelProps) => {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{padding: 0}}
            {...other}
        >
            {value === index && (
                <Box>
                    <Paper
                        style={{
                            borderRadius: 0,
                        }}
                    >
                        {children}
                    </Paper>
                </Box>
            )}
        </div>
    );
};

const MyChip = ({label}: {label: string | undefined}) => {
    return label ? (
        <Chip label={label} style={{marginRight: 8}} color="secondary" />
    ) : null;
};
