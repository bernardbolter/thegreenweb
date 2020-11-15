import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import firebase from './firebase/config';

import Login from './pages/Login/Login';
import Appointments from './pages/Appointments/Appointments';
import Coupons from './pages/Coupons/Coupons';
import Dispensaries from './pages/Dispensaries/Dispensaries';
import Users from './pages/Users/Users';

import Navigation from './components/Navigation';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setUser(user);
      } else {
        console.log("user signed out");
      }
    });
  }, []);

  return (
    !user ? <Login /> : (
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Appointments />
          </Route>
          <Route path="/coupons">
            <Coupons />
          </Route>
          <Route path="/dispensaries">
            <Dispensaries />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
        </Switch>
      </Router> 
    )
  )
}

export default App