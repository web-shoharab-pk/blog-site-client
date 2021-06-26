import { faBlog, faFolderPlus, faShieldAlt, faSignOutAlt, faUserEdit, faUsers, faUserShield, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';
import { SERVER_API } from '../../Login/api';
import './Sidebar.css';

const Sidebar = () => {
    const { user, setUser } = useContext(UserContext)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isWriter, setIsWriter] = useState(false)
    const history = useHistory()



    useEffect(() => {
        fetch(`${SERVER_API}/isAdmin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setIsAdmin(data)
                sessionStorage.setItem("isAdmin", data)
            })
    }, [user.email])

    const handleSignOut = () => {
        firebase.auth().signOut().then((res) => {
            // Sign-out successful 
            setUser(null)
            sessionStorage.removeItem("isAdmin")
            sessionStorage.removeItem('userToken')
            sessionStorage.removeItem("isWriter")
            sessionStorage.removeItem('JWTtoken')
            history.push('/')
        }).catch((error) => {
            // An error happened. 
        });

    }

    useEffect(() => {
        fetch(`${SERVER_API}/isWriter`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email })
        })
            .then(res => res.json())
            .then(data => {
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
                                <li><Link className="sidebarOption" to="/dashboard/usersBlogs"><FontAwesomeIcon icon={faUsers} /> USERS-/-BLOGS</Link></li>
                                <li><Link className="sidebarOption" to="/dashboard/addWriter"><FontAwesomeIcon icon={faUserEdit} /> ADD WRITER</Link></li>
                                <li><Link className="sidebarOption" to="/dashboard/addAdmin"><FontAwesomeIcon icon={faUserShield} /> ADD ADMIN</Link></li>
                            </ul>
                        </div>
                        : ""
                }
                <div className="admin_sidebar">
                    <ul>
                    <li style={{ listStyleType: 'none', fontWeight: 'bold' }}><Link className="sidebarOption" to="/"><FontAwesomeIcon icon={faHome} /> HOME</Link></li>
                        <li><Link className="sidebarOption" to="/dashboard/usersBlogs"><FontAwesomeIcon icon={faUsers} />BLOGS</Link></li> 
                        <li><Link className="sidebarOption" to="/dashboard/addBlog"><FontAwesomeIcon icon={faFolderPlus} /> ADD BLOG</Link></li>                           
                    </ul>
                </div>

                {/* Content writer Dashboard */}
                {
                    isWriter || (sessionStorage.getItem('isWriter') === 'true') ?
                        <div className="writer_dashboard">
                            <h3><Link to="/"><FontAwesomeIcon icon={faUserEdit} /></Link> Writer</h3>
                            <ul>
                                <li><Link className="sidebarOption" to="/dashboard/addBlog"><FontAwesomeIcon icon={faFolderPlus} /> ADD BLOG</Link></li>
                                <li><Link className="sidebarOption" to="/dashboard/myBlogs"><FontAwesomeIcon icon={faBlog} /> MY BLOGS</Link></li>
                            </ul>
                        </div>
                        : ''
                }
                {/* <li style={{ listStyleType: 'none', fontWeight: 'bold' }}><Link className="sidebarOption" to="/"><FontAwesomeIcon icon={faHome} /> HOME</Link></li> */}
                <button style={{position: 'absolute', left: '20px', bottom: '30px', width: '250px'}} onClick={handleSignOut} className="login_btn"><FontAwesomeIcon icon={faSignOutAlt} /> LOG OUT</button>
            </div>
        </section >
    );
};

export default Sidebar;