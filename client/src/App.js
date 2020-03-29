import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { loadUser } from "./Redux/actions/auth";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import store from "./Redux/store";
import setAuthToken from "./Redux/utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
import MyProfile from "./components/dashboards/MyProfile";
import MyListings from "./components/dashboards/MyListings";
import AddListing from "./components/listing/AddListing";
import EditListing from "./components/listing/EditListing";
import AddProfile from "./components/profile/AddProfile";
import EditProfile from "./components/profile/EditProfile";
import AllListingSearch from "./components/listing/AllListingSearch";
import Profiles from "./components/profile/Profiles";
import Avatar from "./components/profile/Avatar";
import AddPhotos from "./components/listing/AddPhotos";
import ListingDetails from "./components/listing/ListingDetails";
import PhotoSortable from "./components/listing/PhotoSortable";
import AgentListingsSearch from "./components/listing/AgentListingsSearch";
import Office from "./components/contact/Office";
import DeletePhotos from "./components/deletephotos/DeletePhotos";
import Pwreset from "./components/auth/Pwreset";
import Pwresetsave from "./components/auth/Pwresetsave";
import Edit from "./components/dashboards/Edit";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

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
                    <section className="container">
                        <ToastContainer />
                        <Switch>
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/listings" component={AllListingSearch} />
                            <Route exact path="/agents" component={Profiles} />
                            <Route exact path="/listing/:id" component={ListingDetails} />
                            <Route exact path="/listings/:id" component={AgentListingsSearch} />
                            <Route exact path="/contact" component={Office} />
                            <Route exact path="/pwreset" component={Pwreset} />
                            <Route exact path="/pwresetsave/:hash" component={Pwresetsave} />
                            <PrivateRoute exact path="/myprofile" component={MyProfile} />
                            <PrivateRoute exact path="/mylistings" component={MyListings} />
                            <PrivateRoute exact path="/edit/:id" component={Edit} />
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
    );
};

export default App;
