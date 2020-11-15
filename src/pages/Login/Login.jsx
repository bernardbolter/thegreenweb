import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import firebase from '../../firebase/config';

import './login.scss';

const Login = () => {
    console.log(firebase);
    const [error, setError] = useState('');
    return (
        <section className="login-container">
            <h1>Login</h1>
            <Formik
                initialValues={{
                    email: "",
                    password: ""
                }}
                onSubmit={values => {
                    console.log(firebase);
                    console.log(values);
                    firebase.auth().signInWithEmailAndPassword(values.email, values.password)
                        .then(() => {
                            setError('');
                        })
                        .catch(error => {
                            setError(error.code);
                        })
                }}
            >
                <Form className="login-form">
                    <Field 
                        className="login-input" 
                        name="email" 
                        type="email" 
                    />
                    <Field 
                        className="login-input" 
                        name="password" 
                        type="password" 
                    />
                    {error ? <p className="login-error">{error}</p> : null}
                    <button type="submit" className="login-submit">Submit</button>
                </Form>
            </Formik>
        </section>
    )

}

export default Login