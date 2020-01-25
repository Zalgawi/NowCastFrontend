import React, { Component } from 'react';
import {Table, Button, ButtonToolbar } from 'react-bootstrap';
import {EditUserModal} from './EditUserModal';
import {AddUserModal} from './AddUserModal';
import ReactDOM from 'react-dom';
import * as moment from 'moment';

const BASE_API_URL = `http://localhost:56062/api/users`;

export class User extends Component {

  state = {users:[], addModalShow : false, editModalShow: false}
        
    

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

  handleModalHide = () => {
    this.setState({ showModal: false });
  };

  handleModalShow = () => {
    this.setState({ showModal: true });
  };

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
   
    const {users} = this.state;
    let addModalClose =() => this.setState({addModalShow:false});
    let editModalClose =() => this.setState({editModalShow:false});

    return(
        <div>
            <ButtonToolbar>
              <Button variant='outline-dark' style={{margin:"auto"}} onClick={()=> this.setState({addModalShow:true})}>
                  Add User
              </Button>
                <AddUserModal show={this.state.addModalShow} onHide={addModalClose} />
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
        {users.map(user=> 

          
          <tr key = {user.Id}>
            <td>{user.Id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.Email}</td>
            <td>{user.mobileNumber}</td>
            <td>{moment(new Date(user.dateOfBirth)).format('YYYY-MM-DD')}</td>
            <td>{moment(new Date(user.lastModified)).format('YYYY-MM-DD HH:mm:ss')}</td>
            <td>
              <ButtonToolbar>
              <Button variant='outline-light' style={{margin:"auto"}} onClick={() => this.handleModalShow()}>
                  Edit User
              </Button>
              <EditUserModal 
                show = {this.state.showModal} 
                onHide = {this.handleModalHide} 
                key = {user.Id}
                userid = {user.Id} 
                firstname = {user.firstName}
                lastname = {user.lastName}
                useremail = {user.Email}
                mobilenumber = {user.mobileNumber}
                dateofbirth = {user.dateOfBirth}
                lastmodified = {user.lastModified} />
              </ButtonToolbar>
              </td>
              <td>
              <Button variant="outline-danger" onClick={()=> this.deleteUser(user.Id)} >Delete</Button>
              </td>
            
          </tr>
          )}
   </tbody>
 </Table>
 
 </div>
    )
}

}