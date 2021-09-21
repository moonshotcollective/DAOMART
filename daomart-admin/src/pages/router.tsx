import {Route, Switch, Redirect} from 'react-router-dom';

import Container from '@material-ui/core/Container';
import CategoryContent from './categories';
import NewCategoryContent from './categories/new-category';
import CategoryPanelPage from './categories/category-panel';
import ProductContent from './products';
import NewProductContent from './products/new-product';
import ProductPanelPage from './products/product-panel';

import OrderContent from './orders';
import NewOrderPage from './orders/new-order';
import OrderPanelPage from './orders/order-panel';
import ArchiveContent from './archives';
import CollectionContent from './collections';
import LobbyPage from './lobby';
import UserContent from './users';
import UserPanelPage from './users/user-panel.page';
//
import ContractContent from './contracts';
import NewContractContent from './contracts/product/new-contract';
import ProductContractPanel from './contracts/product/product-contract-panel';
import CandyContractContent from './contracts/candy';
import NewCandyContractContent from './contracts/new-candy';
import QuadraticLootContractContent from './contracts/quadratic-loot/quadratic-loot';
import NewQuadraticLootContractContent from './contracts/quadratic-loot/new-quadratic-loot';
//
import HttpLogContent from './http-logs';
import GodViewPage from './godview';
import React from 'react';
import {GitcoinContext} from '../store';

const RouterWrapper = () => {
    const {state} = React.useContext(GitcoinContext);

    return (
        <Container style={{marginTop: '1em'}}>
            <Switch>
                <Route path={'/'} exact={true} component={LobbyPage} />
                <Route
                    path={'/categories'}
                    exact={true}
                    component={CategoryContent}
                />
                <Route
                    path={'/categories/new'}
                    exact={true}
                    component={NewCategoryContent}
                />
                <Route
                    path={'/categories/:cid'}
                    exact={true}
                    component={CategoryPanelPage}
                />
                <Route
                    path={'/products'}
                    exact={true}
                    component={ProductContent}
                />
                <Route
                    path={'/products/new'}
                    exact={true}
                    component={NewProductContent}
                />
                <Route
                    path={'/products/:pid'}
                    exact={true}
                    component={ProductPanelPage}
                />
                <Route path={'/orders'} exact component={OrderContent} />
                <Route path={'/orders/new'} exact component={NewOrderPage} />
                <Route path={'/orders/:oid'} exact component={OrderPanelPage} />
                <Route
                    path={'/collections'}
                    exact
                    component={CollectionContent}
                />
                <Route path={'/archives'} exact component={ArchiveContent} />
                <Route path={'/stats'} exact component={UserContent} />{' '}
                <Route path={'/lobby'} exact component={LobbyPage} />{' '}
                <Route path={'/users'} exact component={UserContent} />{' '}
                <Route path={'/users/:uid'} exact component={UserPanelPage} />{' '}
                <Route path={'/http-logs'} exact component={HttpLogContent} />
                <Route path={'/godview'} exact component={GodViewPage} />
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
                />{' '}
                <Route
                    path={'/contracts/product/panel/:cid'}
                    exact
                    component={ProductContractPanel}
                />
                <Route
                    path={'/contracts/candy'}
                    exact
                    component={CandyContractContent}
                />
                <Route
                    path={'/contracts/candy/new'}
                    exact
                    component={NewCandyContractContent}
                />
                <Route
                    path={'/contracts/quadratic-loot'}
                    exact
                    component={QuadraticLootContractContent}
                />
                <Route
                    path={'/contracts/quadratic-loot/new'}
                    exact
                    component={NewQuadraticLootContractContent}
                />
            </Switch>
        </Container>
    );
};
export default RouterWrapper;
