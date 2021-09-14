import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useGetCategoryById} from '../../hooks/Category.hook';
import {GitcoinContext} from '../../store';
import Chip from '@material-ui/core/Chip';
import Title from '../../components/Title.component';
import {Paper} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import Link from '@material-ui/core/Link';

function CategoryPanelPage() {
    const {state} = React.useContext(GitcoinContext);
    const [trigger, setTrigger] = React.useState(false);

    const {pid} = useParams();
    const [product] = useGetCategoryById(state.token, pid, trigger);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Container maxWidth="lg" style={{marginTop: '5rem'}}>
            <Title>Category Panel</Title>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                >
                    <Tab label="Category Card" {...a11yProps(0)} />
                    <Tab label="Activity" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <CategoryTabContent
                value={value}
                index={0}
                product={product}
                token={state.token}
                onTrigger={() => setTrigger(!trigger)}
            />
        </Container>
    );
}

export default CategoryPanelPage;

const CategoryTabContent = ({
    value,
    index,
    product,
    token,
    onTrigger,
}: {
    value: number;
    index: number;
    product: ProductCategory | null;
    token: string | null;
    onTrigger: any;
}) => {
    return (
        <TabPanel value={value} index={index}>
            <div style={{minHeight: 480}}>
                <div style={{padding: 8}}>
                    <Typography variant="overline" component={'h3'}>
                        {product?.category_id}
                    </Typography>
                    <div>
                        <Typography variant="body1" component="span">
                            <Link variant="overline" style={{paddingLeft: 8}}>
                                {`(${product?.name})`}
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
