import React from "react";
import { Route, Switch } from 'react-router-dom'
// import SignupFormContainer from './session_form/signup_container'
// import LoginFormContainer from './session_form/login_container'
import NavBarContainer from './navbar/navbar_container'
import Modal from './modal/modal';
import NotFound from './404/not_found'

// Note that session containers will no longer be necessary due to use of a modal
const App = () => (
  <div>

    {/* Route bugs: 
    1. rendering NotFound component does not clear entire page. If modal is open
    it will remain open when user routes to a undef. route
    2. after showing the NotFound component if user goes back one page it will display 
    an error and will need to refresh the page for components to rerender
    */}
    <Switch>
      <Route exact path='/' component={NavBarContainer} />
      <Route component={NotFound} />
    </Switch>
    <Modal />

    {/* <Route path='/signup' component={SignupFormContainer} />
    <Route path='/login' component={LoginFormContainer} /> */}
  </div>
);

export default App;