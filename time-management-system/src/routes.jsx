import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './App'

//Layouts
import HomeLayout from './layouts/HomeLayout/HomeLayout'
import PrivateLayout from './layouts/PrivateLayout/PrivateLayout'

//Componets
import Home from './components/Home/Home';
import TaskList from './components/TaskList/TaskList';

const RouteWrapper = (props) => {
    const Layout = props.layout;
    const Component = props.component;
    const Wrapped = (props) => (
        <Layout>
            <Component />
        </Layout>
    );

    console.log(props.path);

    return (
        <Route path={props.path} render={Wrapped} />
    );
};

const AppRoutes = () => (
    <App>
        <Switch>
            <RouteWrapper path="/tasks" component={TaskList} layout={PrivateLayout} />
            <RouteWrapper path="/" component={Home} layout={HomeLayout} />
        </Switch>
    </App>
);

export default AppRoutes;