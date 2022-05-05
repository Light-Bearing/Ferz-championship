import React, { useEffect, useState } from 'react';
import AuthenticationService from '../../assets/services/AuthenticationService';
import {Link, NavLink} from "react-router-dom";
import './AppNavBar.css';
import {useNavigate} from "react-router";


function AppNavbar() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        roles: [],
        showUser: false,
        showPM: false,
        showAdmin: false,
        username: undefined,
        surname: undefined,
        name: undefined,
        login: false
    });
    useEffect(() => {
        const user = AuthenticationService.getCurrentUser();

        if (user) {
            const roles = [];

            user.authorities.forEach(authority => {
                roles.push(authority.authority)
            });

            setState({
                roles,
                showAll: roles.includes("ROLE_MAIN_JUDGE") || roles.includes("ROLE_JUDGE") || roles.includes("ROLE_PM") || roles.includes("ROLE_ADMIN"),
                showJudge: roles.includes("ROLE_JUDGE") || roles.includes("ROLE_ADMIN"),
                showPM: roles.includes("ROLE_PM") || roles.includes("ROLE_ADMIN"),
                showMainJudge: roles.includes("ROLE_MAIN_JUDGE") || roles.includes("ROLE_ADMIN"),
                showAdmin: roles.includes("ROLE_ADMIN"),
                login: true,
                username: user.username,
                surname: user.surname,
                name: user.name
            });
        }
    },[]);

    const signOut = () => {
        AuthenticationService.signOut();
        navigate('/', { replace: true });
        window.location.reload();
    }

    const toggle = () => {
        setState({isOpen: !state.isOpen});
    }

    return (
        <nav className='container-fluid d-flex justify-content-between navbar navbar-dark bg-dark navbar-expand sticky' >
            <div className='d-flex align-items-center gap-3 fs-6'>
                { state.showMainJudge && <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/main_judge">Main judge</NavLink> }
                { state.showJudge && <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/judge">Judge</NavLink> }
                { state.showAll && <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/riders">Rider List</NavLink> }
                { state.showPM && <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/pm">PM</NavLink> }
                { state.showAdmin && <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/admin">Admin</NavLink> }
                { state.showAdmin && <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/users">User list</NavLink> }
            </div>
            <div>
                {state.login && (
                    <div className='navbar d-flex justify-content-center '>
                        <p className='text-light m-0 text text-center'>
                            Signed in as: <Link to="/profile">{state.surname + " " + state.name}</Link>
                        </p>
                    </div>
                )}
            </div>
            <div>
                { state.login
                    ? <button className='btn btn-md btn-danger' onClick={()=> signOut()}>SignOut</button>
                    : <button className='btn btn-lg btn-danger'>
                        <NavLink to="/signin">Signin</NavLink>
                       </button>
                }
            </div>
        </nav>
    );
}

export default AppNavbar;