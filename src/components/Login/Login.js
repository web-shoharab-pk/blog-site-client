import React from 'react';
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from '../../firebase.config';
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Login = () => {
    return (
        <div>
            <h1>Login</h1>
        </div>
    );
};

export default Login; 