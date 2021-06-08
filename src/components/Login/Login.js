import firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import React, { useContext } from 'react';
import { firebaseConfig } from './firebase.config';
import logo from '../images/apploreLogo.webp';
import googleLogo from '../images/googleLogo.png'
import './Login.css'
import { Link, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import { SERVER_API } from "./api";
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const { setUser} = useContext(UserContext)
    const history = useHistory() 
    let location = useLocation(); 
  
    let { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleLogin = () => {

        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => { 

                var credential = result.credential;  
                var token = credential.accessToken;
                sessionStorage.setItem("userToken", token)
                // The signed-in user info.
                var user = result.user; 
                const userInfo = {
                    name: user.displayName,
                    image: user.photoURL,
                    email: user.email
                }
                fetch(`${SERVER_API}collectUsers`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userInfo)
                }, [])
                setUser(user);
                storeAuthToken()
                 if(user){
                     history.replace(from)
                 }
                // ...
            }).catch((error) => {
                // Handle Errors here.
              console.log(error);
                // ...
            });
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) { 
             sessionStorage.setItem('JWTtoken', idToken)
          }).catch(function(error) {
            // Handle error
          });
    }


    return (
        <main className="loginPage">
            <div className="login">

                <div>
                    <div>
                        <Link to="/">
                            <img src={logo} alt="" />
                        </Link>
                    </div>

                    <button onClick={() => handleGoogleLogin()} className="googleLoginBtn">
                        <img className="mx-3" src={googleLogo} alt="" />
                        <span className="mx-5"> Sign In with Google</span>
                    </button>
                </div>

            </div>
        </main>
    );
};

export default Login;