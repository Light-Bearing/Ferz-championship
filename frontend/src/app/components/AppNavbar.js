import React, {Component} from 'react';
import {Collapse, Nav, Navbar, NavbarText, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {withRouter} from 'react-router-dom';

import AuthenticationService from '../services/AuthenticationService';

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
        this.props.history.push('/');
        window.location.reload();
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Navbar color="dark" dark expand="md">
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="mr-auto">
                    {this.state.showMainJudge && <NavLink href="/main_judge">Main judge</NavLink>}
                    {this.state.showJudge && <NavLink href="/judge">Judge</NavLink>}
                    {this.state.showAll && <NavLink href="/riders">Rider List</NavLink>}
                    {this.state.showPM && <NavLink href="/pm">PM</NavLink>}
                    {this.state.showAdmin && <NavLink href="/admin">Admin</NavLink>}
                    {this.state.showAdmin && <NavLink href="/users">User list</NavLink>}
                </Nav>
            </Collapse>
            {this.state.login && (
                <Nav className="justify-content-center" style={{flex: 1}} navbar>
                    <NavItem>
                        <NavbarText>
                            Signed in as: <a href="/profile">{this.state.surname + " " + this.state.name}</a>
                        </NavbarText>
                    </NavItem>
                </Nav>)}
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                {
                    this.state.login ? (
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="#" onClick={this.signOut}>SignOut</NavLink>
                            </NavItem>

                            {this.state.roles.includes("ROLE_ADMIN") &&
                            <NavItem>
                                <NavLink href="/signup">SignUp</NavLink>
                            </NavItem>
                            }
                        </Nav>
                    ) : (
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/signin">Signin</NavLink>
                            </NavItem>
                        </Nav>
                    )
                }
            </Collapse>
        </Navbar>;
    }
}

export default withRouter(AppNavbar);