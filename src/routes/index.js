import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SingIn from '~/pages/SingIn';
import Dashboard from '~/pages/Dashboard';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SingIn} />

            <Route path="/dashboard" component={Dashboard} isPrivate />
        </Switch>
    );
}
