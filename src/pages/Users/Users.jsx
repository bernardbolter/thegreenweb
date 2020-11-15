import React from 'react';
import { Formik, Field, Form } from 'formik';
import firebase from '../../firebase/config';

import './users.scss';

const Users = () => {
    return (
        <section className="users-container">
                <Formik
                    initialValues={{
                        email: ""
                    }}
                    onSubmit={values => {
                        console.log(values.email);
                        firebase.functions().httpsCallable('addAdminRole').call({ email: values.email})
                            .then(result => {
                                console.log(result);
                            })
                    }}
                >
                    <Form className="user-admin">
                        <p>Enter Users Email to make an Admin</p>
                        <Field 
                            className="user-admin-input" 
                            name="email" 
                            type="email" 
                        />
                        <button type="submit" className="user-admin-button">submit</button> 
                    </Form>
                </Formik>
            <h1>Users</h1>
        </section>
    )
}

export default Users;