import React, {Component} from 'react';
import AppNavbar from './AppNavbar';

import {Alert, Container} from 'reactstrap';

import BackendService from '../services/BackendService';

class RidersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            riderList: [],
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
    }

    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    {
                        this.state.riderList.length > 0 ? (
                            <Alert variant="info">
                                <table className="table table-bordered align-middle table-nonfluid border-primary">
                                    <thead className="table-dark">
                                    <tr>
                                        <td  className="text-center">№</td>
                                        <td  className="text-center">Surname</td>
                                        <td  className="text-center">Name</td>
                                        <td  className="text-center">Patronymic</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.riderList.map((el, i) => {
                                            return (
                                                <tr className="table-secondary">
                                                    <td  className="text-center">{i + 1}</td>
                                                    <td  className="text-center">{el.surname}</td>
                                                    <td  className="text-center">{el.name}</td>
                                                    <td  className="text-center">{el.patronymic}</td>
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
                    {/* <div style={{marginTop:"20px"}}>
            <Alert variant="primary">
              <h2>FMX championship</h2>
              <Button color="success"><Link to="/signin"><span style={{color:"white"}}>Login</span></Link></Button>
            </Alert>
          </div> */}
                </Container>
            </div>
        );
    }
}

export default RidersList;