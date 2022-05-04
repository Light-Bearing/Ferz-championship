import React, {Component} from 'react';
import AppNavbar from '../AppNavBar/AppNavbar';
import {Alert, Container, Button} from "react-bootstrap";
import AuthenticationService from "../../assets/services/AuthenticationService";
import UserForm from '../UserForm/UserForm';
import UserService from "../../assets/services/UserService";

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            selectedUser: {},
            action: null,
            editedId: null,
            isEditable: false,
            show: false,
            error: ""
        };
    }

    getUserList = () => {
        UserService.getUserList()
            .then(response => {
                this.setState({
                    userList: response.data
                })
            }, error => {
                console.log(error);
                this.setState({
                    error: error.toString()
                });
            });
    }

    componentDidMount() {
        const user = AuthenticationService.getCurrentUser();
        if (user) {
            const roles = [];
            user.authorities.forEach(authority => {
                roles.push(authority.authority)
            });
            const isEditable = roles.includes("ROLE_ADMIN") || roles.includes("PM");
            this.setState({isEditable});
        }
        this.getUserList();
    }


    showEditUser = (action, id) => action === "U" ? this.setState({
        show: true,
        action,
        editedId: id
    }) : this.setState({show: true, action, editedId: null})

    deleteUser = (id) => UserService
        .deleteUser(id)
        .then(
            () => this.setState({userList: this.state.userList.filter(user => user.id !== id)})
        );

    handleClose = () => {
        UserService.getUserList()
            .then(response => {
                this.setState({
                    userList: response.data,
                    show: false,
                    editedId: null
                })
            }, error => {
                console.log(error);
                this.setState({
                    error: error.toString(),
                    show: false,
                    editedId: null
                });
            });
    }

    render() {
        return (
            <div>
                {this.state.editedId ?
                    (<UserForm show={this.state.show}
                               onClose={this.handleClose}
                               action={this.state.action}
                               user={this.state.userList[this.state.userList.findIndex(el => el.id === this.state.editedId)]}
                    />) : (<UserForm
                        show={this.state.show}
                        onClose={this.handleClose}
                        action={this.state.action}
                    />)
                }
                <AppNavbar/>
                <Container fluid>
                    {this.state.userList.length >= 0 ? (
                        <div style={{marginTop: "20px"}}>
                            <Alert variant="primary">
                                {this.state.isEditable &&
                                <Button variant="primary" size="lg" onClick={() => this.showEditUser("A")} block>
                                    Add user
                                </Button>}

                                <table className="table table-bordered align-middle table-nonfluid border-primary">
                                    <thead className="table-dark">
                                    <tr>
                                        <td className="text-center">№</td>
                                        <td className="text-center">Surname</td>
                                        <td className="text-center">Name</td>
                                        <td className="text-center">Patronymic</td>
                                        <td className="text-center">Roles</td>
                                        {this.state.isEditable && <td className="text-center">Action</td>}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.userList.map((el, i) => {
                                            return (
                                                <tr key={el.id} className="table-secondary">
                                                    <td className="text-center">{i + 1}</td>
                                                    <td className="text-center">{el.surname}</td>
                                                    <td className="text-center">{el.name}</td>
                                                    <td className="text-center">{el.patronymic}</td>
                                                    <td className="text-center">{el.roles.map(el => el.name_eng).join(", ")}</td>
                                                    {this.state.isEditable && <td className="text-center">
                                                        <Button variant="primary"
                                                                onClick={() => this.showEditUser("U", el.id)}>Edit</Button>
                                                        <Button variant="danger"
                                                                onClick={() => this.deleteUser(el.id)}>Delete</Button>
                                                    </td>}
                                                </tr>)
                                        }
                                    )}
                                    </tbody>
                                </table>
                            </Alert>
                        </div>
                    ) : (
                        <div style={{marginTop: "20px"}}>
                            <Alert variant="danger">
                                {this.state.error}
                            </Alert>
                        </div>
                    )
                    }

                </Container>
            </div>
        );
    }
}

export default UsersList;