import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import App from './App'

//Layouts
import HomeLayout from './layouts/HomeLayout/HomeLayout'
import PrivateLayout from './layouts/PrivateLayout/PrivateLayout'
import PublicLayout from './layouts/PublicLayout/PublicLayout'

//Componets
import Home from './components/Home/Home';
import TaskList from './components/TaskList/TaskList';
import UserList from './components/UserList/UserList';
import About from './components/About/About';

let currentUser = null//{username: 'Emir'};

const LayoutRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={(props) => (<Layout> <Component {...props} /> </Layout>)} />
);

const PrivateRoute = (props) => {
    if (currentUser) {
        return (
            <LayoutRoute {...props} />
        );
    } else {
        return (
            <Redirect to='/' />
        );
    }
};

const PublicRoute = props => {
    if (currentUser) {
        return (
            <Redirect to='/tasks' />
        );
    } else {
        return (
            <LayoutRoute {...props} />
        );
    }
};

const AppRoutes = () => (
    <App>
        <Switch>
            <PrivateRoute exact path="/tasks" component={TaskList} layout={PrivateLayout} />
            <PrivateRoute exact path="/users" component={UserList} layout={PrivateLayout} />
            <PublicRoute exact path="/" component={Home} layout={HomeLayout} />
            <LayoutRoute exact path="/about" component={About} layout={PublicLayout} />
        </Switch>
    </App>
);

export default AppRoutes;