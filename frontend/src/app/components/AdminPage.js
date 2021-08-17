import AppNavbar from './AppNavbar';
import React, {Component} from 'react';
import {Alert, Container, FormGroup, Label} from 'reactstrap';
import BackendService from '../services/BackendService';
import {Form, Tab, Tabs} from "react-bootstrap";

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainJadge: [],
            error: ""
        }
    }

    componentDidMount() {
        BackendService.getAdminBoard()
            .then(response => {
                this.setState({
                    content: response.data
                })
            }, error => {
                console.log(error);
                this.setState({
                    error: error.toString()
                });
            });
    }

    handleChangeSelect = (event) => {
        console.log(event.target.value);
    }

    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    {
                        this.state.content ? (
                            <div style={{marginTop: "20px"}}>
                                <Alert variant="info">
                                    <Tabs defaultActiveKey="championship" id="uncontrolled-tab-example"
                                          className="mb-3">
                                        <Tab eventKey="championship" title="Championship">
                                            <Form onSubmit={this.props.action === 'A' ? this.signUp : this.update}>
                                                <FormGroup>
                                                    <Label>Main judge</Label>
                                                    <Form.Control
                                                        as="select"
                                                        custom
                                                        onChange={this.handleChangeSelect.bind(this)}
                                                    >
                                                        {this.state.mainJadge.map(
                                                            mainJadge => <option
                                                                value={mainJadge.id}
                                                                key={mainJadge.id}
                                                            >{mainJadge.surname + " " + mainJadge.name + (mainJadge.patronymic ? " " + mainJadge.patronymic : "")}</option>)}
                                                    </Form.Control>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>Judges</Label>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>Assessments</Label>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>Ramps</Label>
                                                </FormGroup>
                                            </Form>
                                        </Tab>
                                        <Tab eventKey="categoryAssessment" title="Assessment">

                                        </Tab>
                                        <Tab eventKey="ramps" title="Ramps">

                                        </Tab>
                                    </Tabs>
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

export default AdminPage;