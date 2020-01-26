import React, { Component } from 'react';
import {Table, Button, ButtonToolbar } from 'react-bootstrap';
import {EditUserModal} from './EditUserModal';
import {AddUserModal} from './AddUserModal';
import ReactDOM from 'react-dom';
import * as moment from 'moment';

const BASE_API_URL = `http://localhost:56062/api/users`;

export class User extends Component {

    constructor(props){
        super(props);
        this.state = {users:[], addModalShow : false, editModalShow: false, 
          currentEditedId: "", currentEditedFirstName: "",
        currentEditedLastName: "", currentEditedEmail: "", currentEditedMobileNumber:"", currentEditedDateOfBirth: ""}
        
    }

    addModalClose =() => this.setState({addModalShow:false});
    editModalClose =() => this.setState({editModalShow:false});


    componentDidMount(){
        this.refreshList();

    }

    refreshList(){
      fetch(BASE_API_URL)
      .then(response=> response.json())
      .then(data => {
          this.setState({users:data})
      })
    }

    componentDidUpdate(){
      this.refreshList();

  }

    deleteUser(userid)
    {
      if(window.confirm('Are you sure?'))
      {
          fetch(`http://localhost:56062/api/users/`+userid,{
              method:'DELETE',
              header:{'Accept':'application/json',
              'Content-Type':'application/json'
          }
          })
      }
    }

render(){
   
   
    
    return(
        <div>
            <ButtonToolbar>
              <Button variant='outline-dark' style={{margin:"auto"}} onClick={()=> this.setState({addModalShow:true})}>
                  Add User
              </Button>
                <AddUserModal show={this.state.addModalShow} onHide={this.addModalClose} />
              </ButtonToolbar>

        <Table responsive borderless style={{borderRadius:"0.3em"}} striped hover size="sm" variant="dark" className="mt-4">
   <thead>
     <tr>
       <th>Id</th>
       <th>First Name</th>
       <th>Last Name</th>
       <th>Email</th>
       <th>Mobile Number</th>
       <th>Date of Birth</th>
       <th>Last Modified</th>
       <th>Edit</th>
       <th>Delete</th>
     </tr>
     </thead>
   <tbody>
        {this.state.users.map(user=> 
          <tr key = {user.Id}>
            <td>{user.Id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.Email}</td>
            <td>{user.mobileNumber}</td>
            <td>{moment(new Date(user.dateOfBirth)).format('DD-MM-YYYY')}</td>
            <td>{moment(new Date(user.lastModified)).format('DD-MM-YYYY HH:mm:SS')}</td>
            <td>
              <ButtonToolbar>
              <Button className="mr-2" variant="outline-light" onClick={()=> { 
                this.setState({ editModalShow: true, currentEditedId: user.Id, currentEditedFirstName: user.firstName,
                  currentEditedLastName: user.lastName, currentEditedEmail: user.Email, currentEditedMobileNumber: user.mobileNumber, currentEditedDateOfBirth: user.dateOfBirth   }); }}>
              Edit User
              </Button>
              </ButtonToolbar>
              </td>
              <td>
              <Button variant="outline-danger" onClick={()=> this.deleteUser(user.Id)} >Delete</Button>
              </td>

          </tr>
          )}
   </tbody>
 </Table>
    <EditUserModal show={this.state.editModalShow} onHide={this.editModalClose} 
    userId={this.state.currentEditedId} firstName={this.state.currentEditedFirstName} lastName={this.state.currentEditedLastName}
    Email={this.state.currentEditedEmail} mobileNumber={this.state.currentEditedMobileNumber} dateOfBirth={this.state.currentEditedDateOfBirth}  />
 </div>
    )
}

}