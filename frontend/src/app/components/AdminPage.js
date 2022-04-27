import AppNavbar from './AppNavbar';
import React, {Component} from 'react';
import {Alert, Container, FormGroup, Label} from 'reactstrap';
import SettingsService from '../services/SettingsChampionship';
import {Button, Form, FormCheck, Tab, Tabs} from "react-bootstrap";

class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: null,
            mainJudgeId: null,
            championshipId: -1,
            judges: [],
            riders: [],
            error: ""
        }
    }

    componentDidMount() {
        SettingsService.getChampionshipList().then(res => {
            console.log(res.data)
            this.setState({
                content: res.data
            })
        }, error => {
            console.log(error);
            this.setState({
                error: error.toString()
            });
        });
    }

    handleChangeChampionship = (e) => {
        console.log(e.target.value)

        SettingsService.getChampionship(e.target.value)
            .then(res => {
                console.log(res.data)
                const content = JSON.parse(JSON.stringify(this.state.content));
                content.judges = content.judges.map(judge => ({
                    ...judge,
                    checked: res.data.judgesIdList.includes(judge.id)
                }));
                content.riders = content.riders.map(rider => ({
                    ...rider,
                    checked: res.data.ridersIdList.includes(rider.id)
                }));
                this.setState({
                    championshipId: e.target.value,
                    mainJudgeId: res.data.mainJudgeId,
                    judges: res.data.judges.map(el => ({...el, checked: el.checked ? el.checked : false})),
                    riders: res.data.riders.map(el => ({...el, checked: el.checked ? el.checked : false})),
                    content
                })
            }, error => {
                console.log(error);
                this.setState({
                    error: error.toString()
                });
            });
    }

    handleChangeSelect = (e) => {
        this.setState({mainJudgeId: e.target.value});
    }

    handleSaveChampionship = () => {
        let sendObject = {
            id: this.state.championshipId,
            title: this.state.title,
            mainJudgeId: Number(this.state.mainJudgeId),
            judges: this.state.judges.filter(el => el.checked),
            riders: this.state.riders.filter(el => el.checked)
        }
        SettingsService.setChampionship(sendObject).then(() => {
            alert("Championship save");
        }, error => {
            console.log(error);
            this.setState({
                error: error.toString()
            });
        });
    }

    handleChangeChampionshipTitle = (e) => {
        this.setState({title: e.target.value});
    }

    handleChecked = (type, e) => {
        const array = JSON.parse(JSON.stringify(this.state[type]));
        const elemId = Number(e.target.id);
        let elem = array.filter(el => el.id === elemId);
        if (elem.length > 0)
            elem[0].checked = e.target.checked;
        else
            array.push({id: elemId, checked: e.target.checked});
        this.setState({[type]: array});
    }

    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    {this.state.content ? (
                        <div style={{marginTop: "20px"}}>
                            <Alert variant="info">
                                <Tabs defaultActiveKey="championship" id="uncontrolled-tab-example"
                                      className="mb-3">
                                    <Tab eventKey="championship" title="Championship">
                                        <Form onSubmit={this.props.action === 'A' ? this.signUp : this.update}>
                                            <FormGroup>
                                                <Label>Select Championship</Label>
                                                <Form.Control
                                                    as="select"
                                                    // custom
                                                    defaultValue={0}
                                                    onChange={this.handleChangeChampionship}
                                                > {this.state.content?.championshipList?.map(
                                                    championship => <option
                                                        value={championship.id}
                                                        key={championship.id}
                                                    >{championship.title ? championship.title : "No title championship"}</option>)}
                                                </Form.Control>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label>Name championship</Label>
                                                <Form.Control size="lg" type="text" placeholder="Title"
                                                              onChange={this.handleChangeChampionshipTitle}/>
                                                <Label>Main judge</Label>
                                                <Form.Control
                                                    as="select"
                                                    // custom
                                                    defaultValue={this.state.mainJudgeId}
                                                    onChange={this.handleChangeSelect}
                                                >
                                                    {this.state.content?.mainJudges?.map(
                                                        mainJudge => <option
                                                            value={mainJudge.id}
                                                            key={mainJudge.id}
                                                        >{mainJudge.surname + " " + mainJudge.name + (mainJudge.patronymic ? " " + mainJudge.patronymic : "")}</option>)}
                                                </Form.Control>
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
                                                    {this.state.content.judges?.map((el, i) => {
                                                            return (
                                                                <tr key={el.id} className="table-secondary">
                                                                    <td className="text-center"><FormCheck
                                                                        name="judges"
                                                                        type="checkbox"
                                                                        id={el.id}
                                                                        checked={el.checked}
                                                                        onChange={this.handleChecked.bind(null, 'judges')}
                                                                    />
                                                                    </td>
                                                                    <td className="text-center">{i + 1}</td>
                                                                    <td className="text-center">{el.surname}</td>
                                                                    <td className="text-center">{el.name}</td>
                                                                    <td className="text-center">{el.patronymic}</td>
                                                                </tr>)
                                                        }
                                                    )}
                                                    </tbody>
                                                </table>
                                                <Label>Riders</Label>
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
                                                    {this.state.content.riders?.map((el, i) => {
                                                            return (
                                                                <tr key={el.id} className="table-secondary">
                                                                    <td className="text-center"><FormCheck
                                                                        name="judges"
                                                                        type="checkbox"
                                                                        id={el.id}
                                                                        checked={el.checked}
                                                                        onChange={this.handleChecked.bind(null, 'riders')}
                                                                    />
                                                                    </td>
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
                                        </Form>
                                        {Number(this.state.championshipId) === -1 &&
                                            <Button onClick={this.handleSaveChampionship}>Save</Button>
                                        }
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