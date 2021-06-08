import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';

const Navbar = () => {
    const { user } = useContext(UserContext); 


    return (
        <div>
            <nav className=" navbar-expand-lg navbar  navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Applore Technologies</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav fw-bold ms-auto mb-2 mb-lg-0 d-flex align-items-center">
                            <li className="nav-item mx-5">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item mx-5">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                            {
                                user?.photoURL ? <li className="nav-item mx-5"> <img style={{ width: '60px', borderRadius: '999px' }} src={user.photoURL} alt="" /> </li>
                                    :
                                    <li className="nav-item mx-5">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;