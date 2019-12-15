import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SingIn from '~/pages/SingIn';
import Student from '~/pages/Student';
import CreateStudent from '~/pages/Student/create';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SingIn} />

            <Route path="/students" component={Student} isPrivate />
            <Route
                path="/students-create"
                component={CreateStudent}
                isPrivate
            />
            <Route path="/plan" component={Student} isPrivate />
            <Route path="/registrations" component={Student} isPrivate />
            <Route path="/help-orders" component={Student} isPrivate />
        </Switch>
    );
}
