import AppNavbar from './AppNavbar';
import React, {Component} from 'react';
import {Container} from 'reactstrap';

import {Alert, Button, Form} from "react-bootstrap"
import RiderService from "../services/RiderService";


class MainJudgePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            riderList: [],
            error: ""
        }
    }

    componentDidMount() {
        RiderService.getRiderList()
            .then(response => {
                const riderList = response.data;
                for (let i = 0; i < 200; i++) {
                    riderList.push({surname: "surname" + i, name: "name" + i, id: i});
                }

                // this.setState({riderList: response.data)})
                this.setState({riderList: riderList});
            }, error => {
                console.log(error);
                this.setState({
                    error: error.toString()
                });
            });
    }

    handleChangeSelect(event) {
        console.log(event.target.value);
    }

    handleStart = () => {

    }

    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    {
                        this.state.riderList ? (
                            <div style={{marginTop: "20px"}}>
                                <Alert variant="info">
                                    <Form.Control
                                        as="select"
                                        custom
                                        onChange={this.handleChangeSelect.bind(this)}
                                    >
                                        {this.state.riderList.map(
                                            rider => <option
                                                value={rider.id}
                                                key={rider.id}
                                            >{rider.surname + " " + rider.name + (rider.patronymic ? " " + rider.patronymic : "")}</option>)}

                                    </Form.Control>
                                    <Button onClick={this.start}>Start</Button>
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

export default MainJudgePage;