import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import * as moment from 'moment';

const BASE_API_URL = `http://localhost:56062/api/users`;

var currentDate = new Date();



export class EditUserModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
          userId: "",
          firstName: "",
        }
    }

    

    componentDidMount(){

    }

    handleSubmit(event){
        event.preventDefault();
        fetch(BASE_API_URL,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                
                Id: event.target.Id.value,
                firstName: event.target.firstName.value,
                lastName: event.target.lastName.value,
                Email: event.target.Email.value,
                mobileNumber: event.target.mobileNumber.value,
                dateOfBirth: event.target.dateOfBirth.value,
                lastModified: currentDate
            })
        })
        .then(res=> res.json())
        .then((result) =>
        {
            console.log(result);
        },
        (error) => {
            console.log('Failed')
        }
        )
    }

    render(){
      

        return(
          
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit User
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="editFormContainer">
                  <Row>
                      <Col sm={12}>
                          <Form onSubmit={this.handleSubmit}>

                          <Form.Group controlId="Id">
                                <Form.Label>User ID</Form.Label>
                                <Form.Control name="Id" disabled defaultValue = {this.props.userId} type="text" placeholder="Id" />
                              </Form.Group>
                              <Form.Group controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control name="firstName" required  type="text" defaultValue = {this.props.firstName} placeholder="First Name" />
                              </Form.Group>
                              <Form.Group controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control name="lastName" required type="text" defaultValue = {this.props.lastName} placeholder="Last Name"  />
                              </Form.Group>
                              <Form.Group controlId="Email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="Email" required type="email" defaultValue = {this.props.Email} placeholder="Email e.g. name@example.com" />
                              </Form.Group>
                              <Form.Group controlId="mobileNumber">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control name="mobileNumber" required type="text" defaultValue = {this.props.mobileNumber} placeholder="Mobile e.g. 0723218223 or +447236475886" />
                              </Form.Group>
                              <Form.Group controlId="dateOfBirth">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control name="dateOfBirth" required type="date" defaultValue = {moment(new Date(this.props.dateOfBirth)).format('YYYY-MM-DD')} placeholder="Date of Birth e.g. 05-02-97" />
                              </Form.Group>
                            <Form.Group>
                                <Button variant="primary" type="submit">Edit User</Button>
                            </Form.Group>
                            
                          </Form>
                          
                      </Col>
                  </Row>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        )
    }
}