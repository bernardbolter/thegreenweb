import React from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase/config';

import "./components.scss";

const handleSignout = async () => {
    console.log("signing out");
    firebase.auth().signOut().then(() => {
        console.log('Signed Out');
      }, function(error) {
        console.error('Sign Out Error', error);
      });
}

export default function Navigation() {
    return (
        <section className="navigation">
            <h1>The Green App Backend</h1>
            <Link to="/">Appointments</Link>
            <Link to="/coupons">Coupons</Link>
            <Link to="/dispensaries">Dispensaries</Link>
            <Link to="/users">Users</Link>
            <p onClick={() => handleSignout()}>sign out</p>
        </section>
    )
}