import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import { Link } from 'react-router-dom'
import asyncRoute from '../../utils/asyncRoute';


const Dashboard = asyncRoute(
    () => import('../../containers/Dashboard/index.jsx'),
    () => Promise.all([import('../../containers/Dashboard/reducer'),])
);
const Other = asyncRoute(
    () => import('../../containers/Other/index.jsx'),
    () => Promise.all([import('../../containers/Other/reducer'),])
);

const Homepage = () => 
    <div>
        <Helmet title='Home'/>
        <h2>HomePage</h2>
        <ul>
            <li>
                <Link to='page1'>Dashboard</Link>
            </li>
            <li>
                <Link to='page2'>Other</Link>
            </li>
        </ul>
    </div>

const App =() => {
    return (
        <div>
            <Helmet
                titleTemplate="%s - React Redux Router RxJS lazy load example"
                titleAttributes={{itemprop: 'name', lang: 'en'}}
            />
            <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Homepage} />
                        <Route exact path="/page1" component={Dashboard} />
                        <Route exact path="/page2" component={Other} />
                    </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
