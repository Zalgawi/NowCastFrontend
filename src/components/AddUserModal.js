import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { BASE_API_URL } from "../config/api";

var currentDate = new Date();

export class AddUserModal extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(BASE_API_URL)
      .then(response => response.json())
      .then(data => {
        this.setState({ users: data });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(BASE_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        Email: event.target.Email.value,
        mobileNumber: event.target.mobileNumber.value,
        dateOfBirth: event.target.dateOfBirth.value,
        lastModified: currentDate
      })
    })
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
        },
        error => {
          console.log("Failed");
        }
      );
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="addFormContainer">
            <Row>
              <Col sm={12}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      name="firstName"
                      required
                      type="text"
                      placeholder="First Name"
                    />
                  </Form.Group>
                  <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      name="lastName"
                      required
                      type="text"
                      placeholder="Last Name"
                    />
                  </Form.Group>
                  <Form.Group controlId="Email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      name="Email"
                      required
                      type="email"
                      placeholder="Email e.g. name@example.com"
                    />
                  </Form.Group>
                  <Form.Group controlId="mobileNumber">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      name="mobileNumber"
                      required
                      type="text"
                      placeholder="Mobile e.g. 0723218223 or +447236475886"
                    />
                  </Form.Group>
                  <Form.Group controlId="dateOfBirth">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      name="dateOfBirth"
                      required
                      type="date"
                      placeholder="Date of Birth e.g. 05-02-97"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Add User
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
