import React, {Component, useEffect, useState} from 'react';
import AppNavbar from '../AppNavBar/AppNavbar';
import {Alert, Col, Container, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import {Button} from 'react-bootstrap';
import AuthenticationService from "../../assets/services/AuthenticationService";
// import avatar from '../../avatar.png';
import {useNavigate} from 'react-router'

import '../App/App.css';


const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.clear();
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        AuthenticationService
            .signin(username, password)
            .then((user) => {
                    const roles = [];
                    user.authorities.forEach(authority => {
                        roles.push(authority.authority)
                    });
                    if (roles.includes("ROLE_JUDGE")) {
                        navigate('/judge');
                    } else if (roles.includes("ROLE_MAIN_JUDGE")) {
                        navigate('/main_judge');
                    } else if (roles.includes("ROLE_PM")) {
                        navigate('/pm');
                    } else if (roles.includes("ROLE_ADMIN"))
                        navigate('/admin');
                },
                error => {
                    console.log("Login fail: error = { " + error.toString() + " }");
                    setError("Can not signin successfully ! Please check username/password again");
                }
            );
    }


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const changeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        name === 'username'
            ? setUsername(value)
            : setPassword(value)
    }

    return (
        <div>
            {/*<AppNavbar/>*/}
            <Container fluid>
                <Row style={{marginTop: "20px"}}>
                    <Col sm="12" md={{size: 3, offset: 4}}>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <h1 style={{"text-align":"center"}}>Russian Motcross Freestyle Championship</h1>
                            <FormGroup>
                                <Label for="username"><strong>Username</strong></Label>
                                <Input autoFocus
                                       type="text"
                                       name="username" id="username"
                                       value={username}
                                       placeholder="Enter Username"
                                       autoComplete="username"
                                       onChange={(e) => changeHandler(e)}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="password"><strong>Password</strong></Label>
                                <Input type="password"
                                       name="password" id="password"
                                       value={password}
                                       placeholder="Enter Password"
                                       autoComplete="password"
                                       onChange={(e) => changeHandler(e)}
                                />
                            </FormGroup>

                            <Button type="submit" variant="primary" size="lg" block>
                                Sign In
                            </Button>
                            {
                                error && (
                                    <Alert color="danger">
                                        {error}
                                    </Alert>
                                )
                            }
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;