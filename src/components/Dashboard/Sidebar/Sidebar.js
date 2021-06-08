import { faBlog, faFolderPlus, faShieldAlt, faSignOutAlt, faUserEdit, faUsers, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';
import './Sidebar.css';

const Sidebar = () => {
    const history = useHistory()
    const { user, setUser } = useContext(UserContext)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isWriter, setIsWriter] = useState(false)
    console.log(user.email);

    console.log(isAdmin);
    const handleSignOut = () => {
        console.log("signout");
        firebase.auth().signOut().then((res) => {
            // Sign-out successful
            console.log(res);
            setUser(null)
            sessionStorage.removeItem('userToken')
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });

    }
    console.log(sessionStorage.getItem('isAdmin'));

    useEffect(() => {
        fetch('http://localhost:5500/isAdmin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setIsAdmin(data)
                if (data) {
                    sessionStorage.setItem("isAdmin", data)
                }
            })
    }, [user.email])


    useEffect(() => {
        fetch('http://localhost:5500/isWriter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setIsWriter(data)
                if (data) {
                    sessionStorage.setItem("isWriter", data)
                }
            })
    }, [user.email])


    return (
        <section className="sidebar p-3">
            <div>
                {
                    isAdmin || (sessionStorage.getItem('isAdmin') === 'true') ?
                        <div className="admin_sidebar">
                            <h3><Link to="/"><FontAwesomeIcon icon={faShieldAlt} /></Link>  Admin</h3>
                            <ul>
                                <li><Link className="sidebarOption" to="/usersBlogs"><FontAwesomeIcon icon={faUsers} /> USERS-/-BLOGS</Link></li>
                                <li><Link className="sidebarOption" to="/addWriter"><FontAwesomeIcon icon={faUserEdit} /> ADD WRITER</Link></li>
                                <li><Link className="sidebarOption" to="/addAdmin"><FontAwesomeIcon icon={faUserShield} /> ADD ADMIN</Link></li>
                            </ul>
                        </div>
                        : ""
                }


                {/* Content writer Dashboard */}
                {
                    isWriter || (sessionStorage.getItem('isWriter') === 'true') ?
                        <div className="writer_dashboard">
                            <h3><Link to="/"><FontAwesomeIcon icon={faUserEdit} /></Link> Writer</h3>
                            <ul>
                                <li><Link className="sidebarOption" to="/addBlog"><FontAwesomeIcon icon={faFolderPlus} /> ADD BLOG</Link></li>
                                <li><Link className="sidebarOption" to="/myBlog"><FontAwesomeIcon icon={faBlog} /> MY BLOGS</Link></li>
                            </ul>
                        </div>
                        : ''
                }

                <button onClick={handleSignOut} className="logout"><FontAwesomeIcon icon={faSignOutAlt} /> LOG OUT</button>
            </div>
        </section >
    );
};

export default Sidebar;