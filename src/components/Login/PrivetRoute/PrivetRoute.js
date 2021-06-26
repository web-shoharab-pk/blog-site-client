import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../../App';

const PrivetRoute = ({ children, ...rest }) => {
    const { user } = useContext(UserContext); 
    console.log(user?.email);
    return (
        <div>
            <Route
                {...rest}
                render={({ location }) =>
                    user?.email ? (
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