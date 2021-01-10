/* eslint-disable */
import React, {useContext, useState, lazy, Suspense} from 'react';
import {Navbar, Nav, NavDropdown, Button, Jumbotron} from 'react-bootstrap';
import './App.css';
import Data from './Data.js';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
//import Detail from './Detail.js';
let Detail = lazy(()=>{ return import('./Detail.js')}); //<-Detail.js가 필요할때만 로딩한다.
import axios from 'axios';
import Cart from './Cart.js';


export let stockContext = React.createContext();


function App() {

  let [shoes, shoes변경] = useState(Data);
  let [stock, stock변경] = useState([10,11,12]);

  return (
    <div className="App">
      

      <Navbar bg="light" expand="lg" >
  <Navbar.Brand href="#home">Shoos Shop</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link as={Link} to="/">Home</Nav.Link>
      <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
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

      <stockContext.Provider value={stock}>

      <div className="row">
      { 
        shoes.map((a,i)=>{
        return <Card key={i} shoes={shoes[i]} i={i} />
         })
      }
      </div>

      </stockContext.Provider>

      <Button className="btn btn-primary" onClick={()=>{

        

        axios.get('https://codingapple1.github.io/shop/data2.json')
        .then((result)=>{
          shoes변경([...shoes, ...result.data]);
        })
        .catch(()=>{})
      }}>더보기</Button>
  </div>
</Route>

<Route path="/detail/:id">
  <stockContext.Provider value={stock}>
  <Suspense fallback={<div>로딩중입니다.</div>}>
  <Detail shoes={shoes} stock={stock} stock변경={stock변경}/>
  </Suspense>
  </stockContext.Provider>
</Route>

<Route path="/cart">
  <Cart></Cart>
</Route>

<Route path="/:id">
  <div>아무거나</div>
</Route>

</Switch>
    </div>
  )
}




function Card(props){

  let stock = useContext(stockContext);
  let history = useHistory();
   
  return (
    <div className="col-md-4" onClick={()=>{  history.push('/detail/'+props.shoes.id)}} >
      <img src={ 'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg' } width="100%"/>
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.content } </p> <p>{ props.shoes.price }원</p>
      <p>재고 : {stock[props.i]}</p>
    </div>
  )
}

export default App;
