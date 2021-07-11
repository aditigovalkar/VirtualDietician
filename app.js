import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import RegisterPage from "views/RegisterPage/RegisterPage.js";
import InformationPage from "views/InformationPage/InformationPage.js";
import DoctorPage from "views/DoctorPage/DoctorPage";
import DietChartPage from "views/DietChartPage/DietChartPage";
import DoctorLandingPage from "views/Components/DoctorLandingPage/DoctorLandingPage";
import PatientLandingPage from "views/Components/PatientLandingPage/PatientLandingPage"



class App extends Component {
  render() {
    let hist = createBrowserHistory();

    return (
      <Router history={hist}>
        <Switch>
          <Route path="/component-page" component={Components} />
          <Route path="/profile-page" component={ProfilePage} />
          <Route path="/login-page" component={LoginPage} />
          <Route path="/register-page" component={RegisterPage}/>
          <Route path="/information-page" component={InformationPage} />
          <Route path="/doctor-page" component={DoctorPage}/>
          <Route path="/dietchart-page" component={DietChartPage}/>
          <Route path="/doctor-landing-page" component={DoctorLandingPage}/>
          <Route path="/patient-landing-page" component={PatientLandingPage}/>
          <Route path="/" component={LandingPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
