import React, {Component} from 'react';
import {Collapse, Nav, Navbar, NavbarText, NavbarToggler, NavItem} from 'reactstrap';
import AuthenticationService from '../../assets/services/AuthenticationService';
import {Link, NavLink} from "react-router-dom";
import './AppNavBar.css';


class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);

        this.state = {
            roles: [],
            showUser: false,
            showPM: false,
            showAdmin: false,
            username: undefined,
            surname: undefined,
            name: undefined,
            login: false
        };
    }

    componentDidMount() {
        const user = AuthenticationService.getCurrentUser();

        if (user) {
            const roles = [];

            user.authorities.forEach(authority => {
                roles.push(authority.authority)
            });

            this.setState({
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
    }

    signOut = () => {
        AuthenticationService.signOut();
        this.props.history.push('/', { replace: true });
        window.location.reload();
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }



    render() {
        return (
            <nav className='container-fluid d-flex justify-content-between navbar navbar-dark bg-dark navbar-expand' >
                <div id={1} className='d-flex align-items-center gap-3'>
                    {this.state.showMainJudge && <NavLink className={({ isActive }) => (isActive ? 'active link' : 'inactive link')} to="/main_judge">Main judge</NavLink>}
                    {this.state.showJudge && <NavLink className={({ isActive }) => (isActive ? 'active link' : 'inactive link')} to="/judge">Judge</NavLink>}
                    {this.state.showAll && <NavLink className={({ isActive }) => (isActive ? 'active link' : 'inactive link')} to="/riders">Rider List</NavLink>}
                    {this.state.showPM && <NavLink className={({ isActive }) => (isActive ? 'active link' : 'inactive link')} to="/pm">PM</NavLink>}
                    {this.state.showAdmin && <NavLink className={({ isActive }) => (isActive ? 'active link' : 'inactive link')} to="/admin">Admin</NavLink>}
                    {this.state.showAdmin && <NavLink className={({ isActive }) => (isActive ? 'active link' : 'inactive link')} to="/users">User list</NavLink>}
                </div>
                <div id={2}>
                    {this.state.login && (
                        <div className='navbar d-flex justify-content-center '>
                            <p className='text-light m-0 text'>
                                Signed in as: <Link to="/profile">{this.state.surname + " " + this.state.name}</Link>
                            </p>
                        </div>
                    )}
                </div>
                <div id={3}>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        {
                            this.state.login ? (
                                <button className='btn btn-md btn-danger' onClick={this.signOut}>SignOut</button>
                            ) : (
                                <Nav className="ml-auto" navbar>
                                    <button className='btn btn-lg btn-danger'>
                                        <NavLink to="/signin">Signin</NavLink>
                                    </button>
                                </Nav>
                            )
                        }
                    </Collapse>
                </div>




                <NavbarToggler onClick={this.toggle}/>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

            </nav>
        );
    }
}

export default AppNavbar;