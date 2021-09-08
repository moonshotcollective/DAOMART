import {Route, Switch, Redirect} from 'react-router-dom';

import Container from '@material-ui/core/Container';
import ShopPage from './shop';
import ProductPage from './shop/product';
import AboutPage from './about';
import ClaimPage from './claim/Claim.page';
import SignIn from '../components/SignIn.component';

import React from 'react';
import {GitcoinContext} from '../store';
import {ACTIONS} from '../store/actions';

const RouterWrapper = () => {
    return (
        <Container style={{marginTop: '1em'}}>
            <Switch>
                <Route path={'/'} exact={true} component={ShopPage} />
                <Route path={'/shop/:pid'} component={ProductPage} />
                <Route path={'/claim'} exact={true} component={ClaimPage} />
                <Route path={'/about'} exact={true} component={AboutPage} />
            </Switch>
        </Container>
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
