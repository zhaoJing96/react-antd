import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import OnePage from '../onePage/index.jsx';
import TwoPage from '../twoPage/index.jsx';
import ThreePage from '../threePage/index.jsx';
import FourPage from '../fourPage/index.jsx';

export default function HomeRoute() {
    return <Fragment>
        <Switch>
            {/* 默认页面 */}
            <Route exact path="/home" component={OnePage}></Route>
            <Route path="/home/onePage" component={OnePage}></Route>
            <Route path="/home/twoPage" component={TwoPage}></Route>
            <Route path="/home/threePage" component={ThreePage}></Route>
            <Route path="/home/fourPage" component={FourPage}></Route>
        </Switch>
    </Fragment>;
}