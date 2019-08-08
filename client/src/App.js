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
import Profiles from './components/profile/Profiles';
import Avatar from './components/profile/Avatar';
import AddPhotos from './components/listing/AddPhotos';
import ListingDetails from './components/listing/ListingDetails';
import PhotoSortable from './components/listing/PhotoSortable';
import AgentListings from './components/listing/AgentListings';
import Office from './components/contact/Office';
import DeletePhotos from './components/deletephotos/DeletePhotos';
import Pwreset from './components/auth/Pwreset';
import Pwresetsave from './components/auth/Pwresetsave';

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
              <Route exact path="/agents" component={Profiles} />
              <Route exact path="/listing/:id" component={ListingDetails} />
              <Route exact path="/listings/:id" component={AgentListings} />
              <Route exact path="/contact" component={Office} />
              <Route exact path="/pwreset" component={Pwreset} />
              <Route exact path="/pwresetsave/:hash" component={Pwresetsave} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/addlisting" component={AddListing} />
              <PrivateRoute exact path="/editlisting/:id" component={EditListing} />
              <PrivateRoute exact path="/editlisting/addphotos/:id" component={AddPhotos} />
              <PrivateRoute exact path="/editlisting/sort/:id" component={PhotoSortable} />
              <PrivateRoute exact path="/editlisting/delete/:id" component={DeletePhotos} />
              <PrivateRoute exact path="/addprofile" component={AddProfile} />
              <PrivateRoute exact path="/editprofile" component={EditProfile} />
              <PrivateRoute exact path="/editprofile/avatar" component={Avatar} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;
