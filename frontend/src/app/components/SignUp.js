import React, {Component} from 'react';
import AppNavbar from './AppNavbar';
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import {Alert, FormControl} from "react-bootstrap"

import Authentication from '../services/AuthenticationService'


const validEmailRegex = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            surname: "",
            name: "",
            patronymic: "",
            email: "",
            roles: [],
            roleList: [],
            password: "",
            message: "",
            successful: false,
            validForm: true,
            errors: {
                firstname: '',
                lastname: '',
                username: '',
                email: '',
                password: ''
            }
        };
    }

    componentDidMount() {
        Authentication.getRoles().then(response => {
            console.log(response)
            this.setState({roleList: response.data})
        })
    }

    changeHandler = (event) => {
        const {name, value} = event.target;

        let errors = this.state.errors;

        switch (name) {
            case 'name':
                errors.name =
                    value.length < 3
                        ? 'Name must be 3 characters long!'
                        : '';
                break;
            case 'surname':
                errors.surname =
                    value.length < 3
                        ? 'Surname must be 3 characters long!'
                        : '';
                break;
            case 'username':
                errors.username =
                    value.length < 5
                        ? 'Username must be 5 characters long!'
                        : '';
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'roles':
                errors.roles = value.roles.size > 0 ? '' : 'Roles is not empty';
                break;
            case 'password':
                errors.password =
                    value.length < 8
                        ? 'Password must be 8 characters long!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({errors, [name]: value}, () => {
            console.log(errors)
        })
    }

    signUp = (e) => {
        e.preventDefault();
        const valid = validateForm(this.state.errors);
        this.setState({validForm: valid});
        if (valid) {
            Authentication.register(
                this.state.surname,
                this.state.name,
                this.state.patronymic,
                this.state.username,
                this.state.email,
                this.state.roles.map(el=> parseInt(el)),
                this.state.password
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    console.log("Fail! Error = " + error.toString());

                    this.setState({
                        successful: false,
                        message: error.toString()
                    });
                }
            );
        }
    }

    onChange = (event) => {
        const { value} = event.target;
        console.log(value)
        let roles = [...this.state.roles];
        if (roles.findIndex(el => el === value)!==-1)
            roles = roles.filter(el => el !== value)
        else
            roles.push(value);
        this.setState({roles});
    }

    render() {
        const title = <h2>Register Judge</h2>;
        const errors = this.state.errors;

        let alert = "";

        if (this.state.message) {
            if (this.state.successful) {
                alert = (
                    <Alert variant="success">
                        {this.state.message}
                    </Alert>
                );
            } else {
                alert = (
                    <Alert variant="danger">
                        {this.state.message}
                    </Alert>
                );
            }
        }

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <Row>
                        <Col sm="12" md={{size: 4, offset: 4}}>
                            {title}
                            <Form onSubmit={this.signUp}>
                                <FormGroup>
                                    <Label for="surname">Surname</Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter surname"
                                        name="surname" id="surname"
                                        value={this.state.surname}
                                        autoComplete="surname"
                                        onChange={this.changeHandler}
                                    />
                                    {
                                        errors.surname && (
                                            <Alert variant="danger">
                                                {errors.surname}
                                            </Alert>
                                        )
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter Name"
                                        name="name" id="name"
                                        value={this.state.name}
                                        autoComplete="name"
                                        onChange={this.changeHandler}
                                    />
                                    {
                                        errors.name && (
                                            <Alert variant="danger">
                                                {errors.name}
                                            </Alert>
                                        )
                                    }
                                </FormGroup>

                                <FormGroup>
                                    <Label for="patronymic">Patronymic</Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter patronymic"
                                        name="patronymic" id="patronymic"
                                        value={this.state.patronymic}
                                        autoComplete="patronymic"
                                        onChange={this.changeHandler}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="username">Username</Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter UserName"
                                        name="username" id="username"
                                        value={this.state.username}
                                        autoComplete="username"
                                        onChange={this.changeHandler}
                                    />
                                    {
                                        errors.username && (
                                            <Alert variant="danger">
                                                {errors.username}
                                            </Alert>
                                        )
                                    }
                                </FormGroup>

                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input required
                                           type="text"
                                           placeholder="Enter Email"
                                           name="email" id="email"
                                           value={this.state.email}
                                           autoComplete="email"
                                           onChange={this.changeHandler}
                                    />
                                    {
                                        errors.email && (
                                            <Alert variant="danger">
                                                {errors.email}
                                            </Alert>
                                        )
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input required
                                           type="password"
                                           placeholder="Enter Password"
                                           name="password" id="password"
                                           value={this.state.password}
                                           autoComplete="password"
                                           onChange={this.changeHandler}
                                    />
                                    {
                                        errors.password && (
                                            <Alert key="errorspassword" variant="danger">
                                                {errors.password}
                                            </Alert>
                                        )
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <Label for="roles">Roles</Label>
                                    <FormControl
                                        required
                                        name="roles" id="roles"
                                        as="select"
                                        multiple
                                        value={this.state.roles}
                                        onChange={this.onChange}
                                    >
                                        {this.state.roleList.map(el => <option value={el.id}>{el.name_eng}</option>)}
                                    </FormControl>
                                    {
                                        errors.roles && (
                                            <Alert key="errorsroles" variant="danger">
                                                {errors.roles}
                                            </Alert>
                                        )
                                    }
                                </FormGroup>

                                <Button variant="primary" type="submit">
                                    Create
                                </Button>
                                {
                                    !this.state.validForm && (
                                        <Alert key="validForm" variant="danger">
                                            Please check the inputs again!
                                        </Alert>
                                    )
                                }

                                {alert}
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>);
    }
}

export default SignUp;