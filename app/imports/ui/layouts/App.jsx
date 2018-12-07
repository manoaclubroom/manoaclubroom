import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListClubs from '../pages/ListClubs';
import ListRequest from '../pages/ListRequests';
import RequestClub from '../pages/RequestClub';
import ListClubsAdminSuper from '../pages/ListClubsAdminSuper';
import ListClubsAdminNormal from '../pages/ListClubsAdminNormal';
import EditClub from '../pages/EditClub';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import MakeProfile from '../pages/MakeProfile';
import DisplayProfile from '../pages/DisplayProfile';
import EditProfile from '../pages/EditProfile';
import ListInterests from '../pages/ListInterests';
import AddInterest from '../pages/AddInterest';
import ListInterestClubs from '../pages/ListInterestClubs';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <ProtectedRoute path="/makeProfile" component={MakeProfile}/>
              <ProtectedRoute path="/displayProfile" component={DisplayProfile}/>
              <ProtectedRoute path="/list" component={ListClubs}/>
              <ProtectedRoute path="/listInterestClubs" component={ListInterestClubs}/>
              <ProtectedRoute path="/request" component={RequestClub}/>
              <ProtectedRoute path="/edit/:_id" component={EditClub}/>
              <ProtectedRoute path="/editProfile/:_id" component={EditProfile}/>
              <AdminProtectedRoute path="/admin" component={ListClubsAdminSuper}/>
              <AdminProtectedRoute path="/interests" component={ListInterests}/>
              <AdminProtectedRoute path="/addInterest" component={AddInterest}/>
              <AdminProtectedRoute path="/listRequest" component={ListRequest}/>
              <ClubAdminProtectedRoute path="/clubAdmin" component={ListClubsAdminNormal}/>
              <ProtectedRoute path="/signout" component={Signout}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

const ClubAdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isClubAdmin = Roles.userIsInRole(Meteor.userId(), 'clubAdmin');
          return (isLogged && isClubAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);
/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};


/** Require a component and location to be passed to each ClubAdminProtectedRoute. */
ClubAdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default App;
