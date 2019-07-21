import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
//Redux
import { Provider } from 'react-redux';
import store from './Redux/store';
import Alert from './components/layout/Alert';
import { loadUser } from './Redux/actions/auth';
import setAuthToken from './Redux/utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/dashboards/Dashboard';
import AddListing from './components/listing/AddListing';
import EditListing from './components/listing/EditListing';
import AddProfile from './components/profile/AddProfile';
import EditProfile from './components/profile/EditProfile';
import Listings from './components/listing/Listings';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/listings" component={Listings} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/addlisting" component={AddListing} />
              <PrivateRoute exact path="/editlisting/:id" component={EditListing} />
              <PrivateRoute exact path="/addprofile" component={AddProfile} />
              <PrivateRoute exact path="/editprofile" component={EditProfile} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}



export default App;
