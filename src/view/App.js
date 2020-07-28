import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../view/home/index.jsx';
import PageNoFind from '../view/404';

function App() {
  return <Router>
        <Switch>
            {/* 默认页面 */}
            <Route exact path="/" component={Home}></Route>
            <Route path="/home" component={Home}></Route>
            <Route component={PageNoFind} />
        </Switch>
    </Router>
}
export default App;