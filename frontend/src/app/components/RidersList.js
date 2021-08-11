import React, {Component} from 'react';
import AppNavbar from './AppNavbar';
import {Alert, Container, Button} from "react-bootstrap";
import AuthenticationService from "../services/AuthenticationService";
import RiderForm from './RiderForm';
import RiderService from "../services/RiderService";

class RidersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            riderList: [],
            selectedRider: {},
            action: null,
            editedId: null,
            isEditable: false,
            show: false,
            error: ""
        };
    }

    componentDidMount() {
        RiderService.getRiderList()
            .then(response => {
                this.setState({
                    riderList: response.data
                })
            }, error => {
                console.log(error);
                this.setState({
                    error: error.toString()
                });
            });
        const user = AuthenticationService.getCurrentUser();
        if (user) {
            const roles = [];
            user.authorities.forEach(authority => {
                roles.push(authority.authority)
            });
            const isEditable = roles.includes("ROLE_ADMIN") || roles.includes("PM");
            this.setState({isEditable});
        }

    }


    showEditRider = (action, id) => action === "U" ? this.setState({
        show: true,
        action,
        editedId: id
    }) : this.setState({show: true, action, editedId: null})

    deleteRider = (id) => RiderService
        .deleteRider(id)
        .then(
            () => this.setState({riderList: this.state.riderList.filter(rider => rider.id !== id)})
        );

    handleClose = (action, rider) => {
        switch (action) {
            case "A": {
                const riderList = [...this.state.riderList];
                riderList.push(rider);
                this.setState({show: false, riderList});
            }
                break;
            case "U":
                const riderList = this.state.riderList.map(el => el.id == rider.id ? rider : el);
                this.setState({show: false, riderList, editedId: null});
                break;
            default:
                this.setState({show: false, editedId: null});
                break;
        }
    }

    render() {

        return (
            <div>
                {this.state.editedId ?
                    (<RiderForm show={this.state.show} onClose={this.handleClose}
                                action={this.state.action}
                                rider={this.state.riderList[this.state.riderList.findIndex(el => el.id === this.state.editedId)]}
                    />) : (<RiderForm show={this.state.show} onClose={this.handleClose}
                                      action={this.state.action}
                    />)
                }
                <AppNavbar/>
                <Container fluid>
                    {this.state.riderList.length >= 0 ? (
                        <Alert variant="primary">
                            {this.state.isEditable &&
                            <Button variant="primary" size="lg" onClick={() => this.showEditRider("A")} block>
                                Add rider
                            </Button>}

                            <table className="table table-bordered align-middle table-nonfluid border-primary">
                                <thead className="table-dark">
                                <tr>
                                    <td className="text-center">№</td>
                                    <td className="text-center">Surname</td>
                                    <td className="text-center">Name</td>
                                    <td className="text-center">Patronymic</td>
                                    {this.state.isEditable && <td className="text-center">Action</td>}
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.riderList.map((el, i) => {
                                        return (
                                            <tr key={el.id} className="table-secondary">
                                                <td className="text-center">{i + 1}</td>
                                                <td className="text-center">{el.surname}</td>
                                                <td className="text-center">{el.name}</td>
                                                <td className="text-center">{el.patronymic}</td>
                                                {this.state.isEditable && <td className="text-center">
                                                    <Button variant="primary"
                                                            onClick={() => this.showEditRider("U", el.id)}>Edit</Button>
                                                    <Button variant="danger"
                                                            onClick={() => this.deleteRider(el.id)}>Delete</Button>
                                                </td>}
                                            </tr>)
                                    }
                                )}
                                </tbody>
                            </table>
                        </Alert>

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

export default RidersList;