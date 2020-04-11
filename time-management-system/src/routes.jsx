import React, { useContext, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import App from './App'
import { StateContext, hasRoles, MANAGER_ROLE, ADMIN_ROLE } from './contexts';

//Layouts
import HomeLayout from './layouts/HomeLayout/HomeLayout'
import PrivateLayout from './layouts/PrivateLayout/PrivateLayout'
import PublicLayout from './layouts/PublicLayout/PublicLayout'

//Componets
import Home from './components/Home/Home';
import TaskList from './components/TaskList/TaskList';
import Task from './components/Task/Task';
import UserList from './components/UserList/UserList';
import User from './components/User/User';
import About from './components/About/About';

const LayoutRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={(props) => (<Layout> <Component {...props} /> </Layout>)} />
);

const AdminRoute = ({ roles: roles, ...rest }) => {
    const stateContext = useContext(StateContext);
    const currentUser = stateContext.currentUser;

    if (currentUser && hasRoles(currentUser.roles, roles)) {
        return (
            <LayoutRoute {...rest} />
        );
    } else {
        return (
            <Redirect to='/' />
        );
    }
};

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
    const storageObject = localStorage.getItem('current-user');
    const storageCurrentUser = storageObject ? JSON.parse(storageObject) : null;
    const [currentUser, setCurrentUser] = useState(storageCurrentUser);

    return (
        <App>
            <StateContext.Provider value={ { currentUser: currentUser, setCurrentUser: setCurrentUser } }>
                <Switch>
                    <PrivateRoute exact path="/tasks" component={TaskList} layout={PrivateLayout} />
                    <PrivateRoute exact path="/task" component={Task} layout={PrivateLayout} />
                    <PrivateRoute exact path="/task/:taskId" component={Task} layout={PrivateLayout} />
                    <AdminRoute exact path="/users" component={UserList} layout={PrivateLayout} roles={ MANAGER_ROLE } />
                    <AdminRoute exact path="/user" component={User} layout={PrivateLayout} roles={ MANAGER_ROLE } />
                    <AdminRoute exact path="/user/:id" component={User} layout={PrivateLayout} roles={ MANAGER_ROLE } />
                    <AdminRoute exact path="/user/:id/tasks" component={TaskList} layout={PrivateLayout} roles={ ADMIN_ROLE } />
                    <AdminRoute exact path="/user/:id/task" component={Task} layout={PrivateLayout} roles={ ADMIN_ROLE } />
                    <AdminRoute exact path="/user/:id/task/:taskId" component={Task} layout={PrivateLayout} roles={ ADMIN_ROLE } />
                    <PublicRoute exact path="/" component={Home} layout={HomeLayout} />
                    <LayoutRoute exact path="/about" component={About} layout={PublicLayout} />
                </Switch>
            </StateContext.Provider>
        </App>
    );
};

export default AppRoutes;