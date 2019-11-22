import React from 'react';
import { AuthRoute /*, ProtectedRoute */ } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import ConnectComponent from './connect/connect';

const App = () => (
    <div>
        <NavBarContainer />
        <Switch>
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
            <Route exact path="/connect/chats/:chatUserId" component={ConnectComponent}/>
            <Route path="/connect" component={ConnectComponent}/>
        </Switch>
    </div>
);

export default App;
