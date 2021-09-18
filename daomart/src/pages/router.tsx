import {Route, Switch, Redirect} from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Splash from './Splash';
import ShopPage from './shop';
import ProductPage from './shop/product';
import QuadraticLootPage from './shop/q-loot';
import AboutPage from './about';
import ClaimPage from './claim/Claim.page';
import SignIn from '../components/SignIn.component';

import React from 'react';
import {GitcoinContext} from '../store';

const RouterWrapper = () => {
    return (
        <div style={{marginTop: '1em'}}>
            <Switch>
                <Route path={'/'} exact={true} component={Splash} />
                <Route path={'/shop'} exact={true} component={ShopPage} />
                <Route path={'/shop/product/:pid'} component={ProductPage} />
                <Route
                    path={'/shop/quadratic-loot'}
                    component={QuadraticLootPage}
                />
                <Route path={'/claim'} exact={true} component={ClaimPage} />
                <Route path={'/about'} exact={true} component={AboutPage} />
            </Switch>
        </div>
    );
};
const AuthRouter = () => {
    const {dispatch} = React.useContext(GitcoinContext);

    return (
        <Container style={{marginTop: '1em'}}>
            <Switch>
                <Route path={'/'} component={SignIn} />
            </Switch>
        </Container>
    );
};
export {RouterWrapper, AuthRouter};
