import React, {Component} from 'react';
import AppNavbar from './AppNavbar';
import {Alert, Col, Container, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import {Button} from 'react-bootstrap';
import AuthenticationService from "../services/AuthenticationService";
// import avatar from '../../avatar.png';

import '../../App.css';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            error: ""
        };
    }

    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    doLogin = async (event) => {
        event.preventDefault();

        AuthenticationService
            .signin(this.state.username,
                this.state.password)
            .then(
                (user) => {
                    const roles = [];
                    user.authorities.forEach(authority => {
                        roles.push(authority.authority)
                    });
                    if (roles.includes("ROLE_JUDGE")) {
                        this.props.history.push('/judge');
                    } else if (roles.includes("ROLE_MAIN_JUDGE")) {
                        this.props.history.push('/main_judge');
                    } else if (roles.includes("ROLE_PM")) {
                        this.props.history.push('/pm');
                    } else if (roles.includes("ROLE_ADMIN"))
                        this.props.history.push('/admin');
                },
                error => {
                    console.log("Login fail: error = { " + error.toString() + " }");
                    this.setState({error: "Can not signin successfully ! Please check username/password again"});
                }
            );
    }

    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <Row style={{marginTop: "20px"}}>
                        <Col sm="12" md={{size: 3, offset: 4}}>
                            <Form onSubmit={this.doLogin}>
                                <FormGroup>
                                    <Label for="username"><strong>Username</strong></Label>
                                    <Input autoFocus
                                           type="text"
                                           name="username" id="username"
                                           value={this.state.username}
                                           placeholder="Enter Username"
                                           autoComplete="username"
                                           onChange={this.changeHandler}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="password"><strong>Password</strong></Label>
                                    <Input type="password"
                                           name="password" id="password"
                                           value={this.state.password}
                                           placeholder="Enter Password"
                                           autoComplete="password"
                                           onChange={this.changeHandler}
                                    />
                                </FormGroup>

                                <Button type="submit" variant="primary" size="lg" block>
                                    Sign In
                                </Button>
                                {
                                    this.state.error && (
                                        <Alert color="danger">
                                            {this.state.error}
                                        </Alert>
                                    )
                                }
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>);
    }
}

export default Login;