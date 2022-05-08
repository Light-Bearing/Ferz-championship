import React, {Component} from 'react';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {Alert, FormControl, InputGroup, Modal} from "react-bootstrap"

import Authentication from '../../assets/services/AuthenticationService'
import UserService from "../../assets/services/UserService";


const validEmailRegex = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class UserForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
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
                password: '',
                roles: ''
            }
        };
    }

    componentDidMount() {
        Authentication.getRoles().then(response => {
            console.log(response)
            this.setState({roleList: response.data})
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.user) {
            console.log(this.props.user);
            if (prevState.id !== this.props.user.id) {
                this.setState({
                    id: this.props.user.id,
                    username: this.props.user.username,
                    surname: this.props.user.surname,
                    name: this.props.user.name,
                    patronymic: this.props.user.patronymic,
                    email: this.props.user.email,
                    roles: this.props.user.roles.map(el => el.id),
                    // password: ,
                });
            }
        } else {
            if (prevState.id !== this.state.id)
                this.setState({
                    id: null,
                    username: "",
                    surname: "",
                    name: "",
                    patronymic: "",
                    email: "",
                    roles: [],
                    password: "",
                })
        }
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
            // case 'roles':
            //
            //     break;
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
                this.state.roles.map(el => parseInt(el)),
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

    update = (e) => {
        e.preventDefault();
        const valid = validateForm(this.state.errors);
        this.setState({validForm: valid});
        if (valid) {
            UserService.setUpdateUser(
                {
                    id: this.state.id,
                    surname: this.state.surname,
                    name: this.state.name,
                    patronymic: this.state.patronymic,
                    username: this.state.username,
                    email: this.state.email,
                    roleId: this.state.roles.map(el => parseInt(el)),
                }
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

    updatePassword = () => {
        const valid = validateForm(this.state.errors);
        this.setState({validForm: valid});
        if (valid) {
            UserService.setUpdatePassword(this.state.id, this.state.password).then(
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
        let value = Array.from(event.target.selectedOptions, option => option.value);
        console.log(value)
        // let num=Number(value);
        // let roles = [...this.state.roles];
        // if (roles.findIndex(el => el === num) !== -1)
        //     roles = roles.filter(el => el !== num)
        // else
        //     roles.push(num);
        this.setState({roles:value});
    }

    render() {
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
            <Modal show={this.props.show} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.action === "A" ? "Register new user" : "User editing"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Form onSubmit={this.props.action === 'A' ? this.signUp : this.update}>
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
                                {this.props.action === 'A' ? <Input required
                                                                    type="password"
                                                                    placeholder="Enter Password"
                                                                    name="password" id="password"
                                                                    value={this.state.password}
                                                                    autoComplete="password"
                                                                    onChange={this.changeHandler}
                                /> : <InputGroup className="mb-3">
                                    <FormControl
                                        type="password"
                                        name="password" id="password"
                                        placeholder="Enter Password"
                                        aria-label="Enter Password"
                                        aria-describedby="basic-addon2"
                                        onChange={this.changeHandler}
                                    />
                                    <Button variant="outline-secondary" id="button-addon2"
                                            onClick={this.updatePassword}>
                                        Save
                                    </Button>
                                </InputGroup>}
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
                                    {this.state.roleList.map(el => <option value={el.id}
                                                                           key={el.id}>{el.name_eng}</option>)}
                                </FormControl>
                                {
                                    errors.roles && (
                                        <Alert key="errorsroles" variant="danger">
                                            {errors.roles}
                                        </Alert>
                                    )
                                }
                            </FormGroup>

                            { this.state.roles.length > 0 && <Button variant="primary" type="submit">
                                {this.props.action === 'A' ? "Create" : "Update"}
                            </Button>}
                            {
                                !this.state.validForm && (
                                    <Alert key="validForm" variant="danger">
                                        Please check the inputs again!
                                    </Alert>
                                )
                            }

                            {alert}
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>);
    }
}

export default UserForm;