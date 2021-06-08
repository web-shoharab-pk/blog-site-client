import { faBlog, faFolderPlus, faShieldAlt, faSignOutAlt, faUserEdit, faUsers, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from "firebase/app";
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const history = useHistory()


    const handleSignOut = () => {
        firebase.auth().signOut().then(() => {
            sessionStorage.removeItem('userToken')
            history.push('/')
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <section className="sidebar p-3">
            <div>
                {/* admin sidebar */}
                <div className="admin_sidebar">
                    <h3><Link to="/"><FontAwesomeIcon icon={faShieldAlt} /></Link>  Admin</h3>
                    <ul>
                        <li><Link className="sidebarOption" to="/usersBlogs"><FontAwesomeIcon icon={faUsers} /> USERS-/-BLOGS</Link></li>
                        <li><Link className="sidebarOption" to="/addWriter"><FontAwesomeIcon icon={faUserEdit} /> ADD WRITER</Link></li>
                        <li><Link className="sidebarOption" to="/addAdmin"><FontAwesomeIcon icon={faUserShield} /> ADD ADMIN</Link></li>
                    </ul>
                </div>

                {/* Content writer Dashboard */}
                <div className="writer_dashboard">
                    <h3><Link to="/"><FontAwesomeIcon icon={faUserEdit} /></Link> Writer</h3>
                    <ul>
                        <li><Link className="sidebarOption" to="/addBlog"><FontAwesomeIcon icon={faFolderPlus} /> ADD BLOG</Link></li>
                        <li><Link className="sidebarOption" to="/myBlog"><FontAwesomeIcon icon={faBlog} /> MY BLOGS</Link></li>
                    </ul>
                </div>
                <span onClick={handleSignOut} className="logout"><FontAwesomeIcon icon={faSignOutAlt} /> LOG OUT</span>
            </div>
        </section>
    );
};

export default Sidebar;