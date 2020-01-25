import React, { Component } from 'react';
import { Navbar } from "react-bootstrap";

export class Navigation extends Component {

render(){
    return(
        <Navbar bg="dark" expand="lg" variant="dark">
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    <Navbar.Brand href="#home">User Manager</Navbar.Brand>
  </Navbar>
    )
}

}