import React, {Component} from 'react';
import AppNavbar from './AppNavbar';
import BackendService from '../services/BackendService';
import {Alert, Container, Button} from "react-bootstrap";
import AuthenticationService from "../services/AuthenticationService";
import RiderForm from './RiderForm';

class RidersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            riderList: [],
            selectedRider:{},
            isEditable: false,
            show: false,
            error: ""
        };
    }

    componentDidMount() {
        BackendService.getRiderList()
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


    showEditRider = () => this.setState({show: true})

    handleClose = () => this.setState({show: false});

    render() {

        return (
            <div>
                <RiderForm show={this.state.show} onClose={this.handleClose}  />
                <AppNavbar/>
                <Container fluid>
                    {this.state.riderList.length >= 0 ? (
                        <Alert variant="primary">
                            {this.state.isEditable &&
                            <Button variant="primary" size="lg" onClick={this.showEditRider} block>
                                Add rider
                            </Button>}

                            <table className="table table-bordered align-middle table-nonfluid border-primary">
                                <thead className="table-dark">
                                <tr>
                                    <td className="text-center">№</td>
                                    <td className="text-center">Surname</td>
                                    <td className="text-center">Name</td>
                                    <td className="text-center">Patronymic</td>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.riderList.map((el, i) => {
                                        return (
                                            <tr key={i} className="table-secondary">
                                                <td className="text-center">{i + 1}</td>
                                                <td className="text-center">{el.surname}</td>
                                                <td className="text-center">{el.name}</td>
                                                <td className="text-center">{el.patronymic}</td>
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