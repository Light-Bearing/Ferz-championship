import AppNavbar from './AppNavbar';
import React, {Component} from 'react';
import {Alert, Container, FormGroup, Label} from 'reactstrap';
import BackendService from '../services/BackendService';
import {Button, Form, FormCheck, Tab, Tabs} from "react-bootstrap";

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainJudge: [],
            judgeList: [],
            assessmentCategory:[{name:"asdfasdf"},{name:"2134524"}],
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
                                                        {this.state.mainJudge.map(
                                                            mainJudge => <option
                                                                value={mainJudge.id}
                                                                key={mainJudge.id}
                                                            >{mainJudge.surname + " " + mainJudge.name + (mainJudge.patronymic ? " " + mainJudge.patronymic : "")}</option>)}
                                                    </Form.Control>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>Judges</Label>
                                                    <table
                                                        className="table table-bordered align-middle border-primary">
                                                        <thead className="table-dark">
                                                        <tr>
                                                            <td className="text-center">Participates</td>
                                                            <td className="text-center">№</td>
                                                            <td className="text-center">Surname</td>
                                                            <td className="text-center">Name</td>
                                                            <td className="text-center">Patronymic</td>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {this.state.judgeList.map((el, i) => {
                                                                return (
                                                                    <tr key={el.id} className="table-secondary">
                                                                        <td className="text-center"><FormCheck name="judges" type="checkbox" id={el.id} /></td>
                                                                        <td className="text-center">{i + 1}</td>
                                                                        <td className="text-center">{el.surname}</td>
                                                                        <td className="text-center">{el.name}</td>
                                                                        <td className="text-center">{el.patronymic}</td>
                                                                    </tr>)
                                                            }
                                                        )}
                                                        </tbody>
                                                    </table>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>Assessments</Label>
                                                    <table
                                                        className="table table-bordered align-middle border-primary">
                                                        <thead className="table-dark">
                                                        <tr>
                                                            <td className="text-center">Participates</td>
                                                            <td className="text-center">№</td>
                                                            <td className="text-center">Assessment category</td>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {this.state.assessmentCategory.map((el, i) => {
                                                                return (
                                                                    <tr key={el.id} className="table-secondary">
                                                                        <td className="text-center"><FormCheck name="assessment" type="checkbox" id={el.id} /></td>
                                                                        <td className="text-center">{i + 1}</td>
                                                                        <td className="text-center">{el.name}</td>
                                                                    </tr>)
                                                            }
                                                        )}
                                                        </tbody>
                                                    </table>
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