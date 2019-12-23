import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SingIn from '~/pages/SingIn';
import Student from '~/pages/Student';
import CreateStudent from '~/pages/Student/create';
import Plan from '~/pages/Plan';
import CreatePlan from '~/pages/Plan/create';
import Registration from '~/pages/Registration/index';
import CreateRegistration from '~/pages/Registration/create';
import HelpOrder from '~/pages/HelpOrder';

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
            <Route
                path="/students-update/:id"
                component={CreateStudent}
                isPrivate
            />
            <Route path="/plans" component={Plan} isPrivate />
            <Route path="/plans-create" component={CreatePlan} isPrivate />
            <Route path="/plans-update/:id" component={CreatePlan} isPrivate />
            <Route path="/registrations" component={Registration} isPrivate />
            <Route
                path="/registrations-create"
                component={CreateRegistration}
                isPrivate
            />
            <Route
                path="/registrations-update/:id"
                component={CreateRegistration}
                isPrivate
            />
            <Route path="/help-orders" component={HelpOrder} isPrivate />
        </Switch>
    );
}
