import React, { useContext, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import App from './App'
import { StateContext } from './contexts';

//Layouts
import HomeLayout from './layouts/HomeLayout/HomeLayout'
import PrivateLayout from './layouts/PrivateLayout/PrivateLayout'
import PublicLayout from './layouts/PublicLayout/PublicLayout'

//Componets
import Home from './components/Home/Home';
import TaskList from './components/TaskList/TaskList';
import UserList from './components/UserList/UserList';
import About from './components/About/About';

const LayoutRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={(props) => (<Layout> <Component {...props} /> </Layout>)} />
);

const PrivateRoute = (props) => {
    const stateContext = useContext(StateContext);

    if (stateContext.currentUser) {
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
    const stateContext = useContext(StateContext);

    if (stateContext.currentUser) {
        return (
            <Redirect to='/tasks' />
        );
    } else {
        return (
            <LayoutRoute {...props} />
        );
    }
};

const AppRoutes = () => {
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('current-user'));

    return (
        <App>
            <StateContext.Provider value={{ currentUser: currentUser, setCurrentUser: setCurrentUser }}>
                <Switch>
                    <PrivateRoute exact path="/tasks" component={TaskList} layout={PrivateLayout} />
                    <PrivateRoute exact path="/users" component={UserList} layout={PrivateLayout} />
                    <PublicRoute exact path="/" component={Home} layout={HomeLayout} />
                    <LayoutRoute exact path="/about" component={About} layout={PublicLayout} />
                </Switch>
            </StateContext.Provider>
        </App>
    );
};

export default AppRoutes;