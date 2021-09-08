import {Route, Switch, Redirect} from 'react-router-dom';

import Container from '@material-ui/core/Container';
import CategoryContent from './categories';
import NewCategoryContent from './categories/new-category';
import ProductContent from './products';
import NewProductContent from './products/new-product';
import OrderContent from './orders';
import NewOrderPage from './orders/new-order';
import OrderPanelPage from './orders/order-panel';
import ArchiveContent from './archives';
import CollectionContent from './collections';
import UserContent from './users';
import UserPanelPage from './users/user-panel.page';
import ContractContent from './contracts';
import NewContractContent from './contracts/new-contract';
import CandyContractContent from './contracts/candy';
import NewCandyContractContent from './contracts/new-candy';
import HttpLogContent from './http-logs';
import React from 'react';
import {GitcoinContext} from '../store';

const RouterWrapper = () => {
    const {state} = React.useContext(GitcoinContext);

    return (
        <Container style={{marginTop: '1em'}}>
            <Switch>
                <Route
                    path={'/categories'}
                    exact={true}
                    component={CategoryContent}
                />{' '}
                <Route
                    path={'/categories/new'}
                    exact={true}
                    component={NewCategoryContent}
                />
                <Route
                    path={'/products'}
                    exact={true}
                    component={ProductContent}
                />{' '}
                <Route
                    path={'/products/new'}
                    exact={true}
                    component={NewProductContent}
                />
                <Route path={'/orders'} exact component={OrderContent} />{' '}
                <Route path={'/orders/new'} exact component={NewOrderPage} />{' '}
                <Route path={'/orders/:oid'} exact component={OrderPanelPage} />{' '}
                <Route
                    path={'/collections'}
                    exact
                    component={CollectionContent}
                />{' '}
                <Route path={'/archives'} exact component={ArchiveContent} />{' '}
                <Route path={'/stats'} exact component={UserContent} />{' '}
                <Route path={'/users'} exact component={UserContent} />{' '}
                <Route path={'/users/:uid'} exact component={UserPanelPage} />{' '}
                <Route path={'/http-logs'} exact component={HttpLogContent} />
                <Redirect from={'/contracts'} to="/contracts/product" exact />
                <Route
                    path={'/contracts/product'}
                    exact
                    component={ContractContent}
                />
                <Route
                    path={'/contracts/product/new'}
                    exact
                    component={NewContractContent}
                />
                <Route
                    path={'/contracts/candy'}
                    exact
                    component={CandyContractContent}
                />{' '}
                <Route
                    path={'/contracts/candy/new'}
                    exact
                    component={NewCandyContractContent}
                />
            </Switch>
        </Container>
    );
};
export default RouterWrapper;
