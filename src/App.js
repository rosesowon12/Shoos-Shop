/* eslint-disable */
import React, {useState} from 'react';
import {Navbar, Nav, NavDropdown, Button, Jumbotron} from 'react-bootstrap';
import './App.css';
import Data from './Data.js';
import { Link, Route, Switch } from 'react-router-dom';
import Detail from './Detail.js';

function App() {

  let [shoes, shoes변경] = useState(Data);

  return (
    <div className="App">
      

      <Navbar bg="light" expand="lg" >
  <Navbar.Brand href="#home">Shoos Shop</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link><Link to="/">Home</Link></Nav.Link>
      <Nav.Link><Link to="/detail">Detail</Link></Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>

<Switch>
<Route exact path="/">
  <Jumbotron className="background">
  <h1>Welcome to Song's Shop</h1>
  <p>
    This is a simple hero unit, a simple jumbotron-style component for calling
    extra attention to featured content or information.
  </p>
  <p>
    <Button variant="primary">Learn more</Button>
  </p>
  </Jumbotron>

  <div className="container">
      <div className="row">
      { 
        shoes.map((a,i)=>{
        return <Card key={i} shoes={shoes[i]} i={i} />
         })
      }
      </div>
  </div>
</Route>

<Route path="/detail/:id">
  <Detail shoes={shoes}/>
</Route>

<Route path="/:id">
  <div>아무거나</div>
</Route>

</Switch>
    </div>
  )
}




function Card(props){
  return (
    <div className="col-md-4">
      <img src={ 'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg' } width="100%"/>
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.content } & { props.shoes.price }</p>
    </div>
  )
}

export default App;
