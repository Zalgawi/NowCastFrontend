import React from 'react';
import './App.css';
import {  Jumbotron, Container } from "react-bootstrap";
import {Home} from './components/Home';
import {User} from './components/User';
import {Navigation} from './components/Navigation';


function App() {
  return (
    <div className="App">
      <Navigation />
      <Jumbotron fluid className="userJumbotron"  id="homeJumbotron" >
  <Container>
  <Home />
      <User />
  </Container>
</Jumbotron>
      
      
    </div>
  );
}

export default App;
