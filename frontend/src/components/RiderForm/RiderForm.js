import React, {Component} from "react";
import {Input, Label} from 'reactstrap';
import {Alert, Button, Modal} from "react-bootstrap";
import RiderService from "../../assets/services/RiderService";


class RiderForm extends Component {


    constructor(props) {
        // const [surname, setSurname] = useState("props.rider.surname");
        super(props);
        this.state = {
            rider: props.rider ? {...props.rider} : {
                surname: "",
                name: "",
                patronymic: ""
            },

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.rider !== this.props.rider) {
            this.setState({
                rider: this.props.rider ? {...this.props.rider} : {
                    surname: "",
                    name: "",
                    patronymic: ""
                }
            })
        }
    }


    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        let rider = {...this.state.rider};
        rider[nam] = val;
        this.setState({rider});
    }

    saveAndClose = () => {
        this.props.action === "A" ?
            RiderService.setNewRider(this.state.rider).then(rider =>
                this.props.onClose(this.props.action, rider.data)) :
            RiderService.setUpdateRider(this.state.rider).then(rider =>
                this.props.onClose(this.props.action, rider.data))
    }

    render() {
        return <Modal show={this.props.show} onHide={this.props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{this.props.action === "A" ? "New a  rider" : "Rider editing"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="info">
                    <Label for="surname"><strong>Surname</strong></Label>
                    <Input autoFocus
                           type="text"
                           name="surname" id="Surname"
                           value={this.state.rider.surname}
                           placeholder="Enter surname"
                           autoComplete="Surname"
                           onChange={this.changeHandler}
                    />
                    <Label for="name"><strong>Name</strong></Label>
                    <Input autoFocus
                           type="text"
                           name="name" id="Name"
                           value={this.state.rider.name}
                           placeholder="Enter name"
                           autoComplete="name"
                           onChange={this.changeHandler}
                    />
                    <Label for="patronymic"><strong>Patronymic</strong></Label>
                    <Input autoFocus
                           type="text"
                           name="patronymic" id="patronymic"
                           value={this.state.rider.patronymic}
                           placeholder="Enter patronymic"
                           autoComplete="patronymic"
                           onChange={this.changeHandler}
                    />
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.props.onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.saveAndClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>;
    }

}

export default RiderForm;
