import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../../App';

const PrivetRoute = ({ children, ...rest }) => {
    const { user } = useContext(UserContext);
    console.log(user);
    let userToken = sessionStorage.getItem("userToken")
    console.log(userToken);
    return (
        <div>
            <Route
                {...rest}
                render={({ location }) =>
                    user?.email && sessionStorage.getItem('userToken') ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        </div>
    );
};

export default PrivetRoute;