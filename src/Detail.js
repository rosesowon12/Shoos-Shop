/* eslint-disable */
import React, {useContext, useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {Navbar, Nav, NavDropdown, Button, Jumbotron} from 'react-bootstrap';
import styled from 'styled-components';
import './Detail.scss';
import {stockContext} from './App.js';
import {CSSTransition} from "react-transition-group";
import { connect } from 'react-redux';


//css component
let box = styled.div`
    padding : 20px;
`;

let titleCss = styled.h4` 
    font-size : 25px;
    coloe : ${ props => props.color }
`;

function Detail(props) {

    let [alert, alert변경] = useState(true);
    let [write, write변경] = useState("");
    let stock = useContext(stockContext);

    let [tab, tab변경] = useState(0);
    let [스위치, 스위치변경] = useState(false);
    useEffect(()=>{
      setTimeout(()=>{
        alert변경(false)
      }, 2000)

      return function name(params) {
        
      }
    }, [alert]);

   

    let history = useHistory();

    let { id } = useParams();
    
    let findDetail = props.shoes.find(function (detail) {
        return detail.id == id
    });

    return(
      <div className="container">
          <box>
              <titleCss className="red">상세페이지</titleCss>
          </box>

          <input onChange={ (e)=>{
            write변경(e.target.value)
          }}/>

          {
            alert === true 
            ? 
            <div className="my-alert">
            <p>재고가 얼마 남지 않았습니다.</p>
            </div> 
            : null
          }
        
          <div className="row">
            <div className="col-md-6">
              <img src={`https://codingapple1.github.io/shop/shoes${findDetail.id + 1}.jpg`} width="100%" />
            </div>
            <div className="col-md-6 mt-4">
              <h4 className="pt-5">{findDetail.title}</h4>
              <p>{findDetail.content}</p> 
              <p>{findDetail.price}원</p>

              <Info stock={props.stock}></Info>

              <button className="btn btn-danger" onClick={ ()=>{
                props.stock변경()
                props.dispatch({type : '항목추가', payload : {id:findDetail.id, name:findDetail.title, quan:1}});
                history.push('/cart'); //page 이동
              }}>주문하기</button> 
              <button className="btn btn-danger" onClick={()=>{
                history.goBack();
              }}>뒤로가기</button> 
           
            </div>
          </div>

          <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
            <Nav.Item>
              <Nav.Link eventKey="link-0" onClick={()=>{ 스위치변경(false); tab변경(0)}}>Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1" onClick={()=>{ 스위치변경(false); tab변경(1)}}>Option 2</Nav.Link>
            </Nav.Item>
          </Nav>

          <CSSTransition in={스위치} classNames="wow" timeout={500}>
            <TabContent tab={tab} 스위치변경={스위치변경}/>
          </CSSTransition>
          
          

          
        </div> 
    )
   }

  function TabContent(props){

    useEffect(()=>{
      props.스위치변경(true);
    })
    
    if(props.tab ===0){
      return <div>0번쨰 내용입니다.</div>
    } else if (props.tab === 1){
      return <div>1번쨰 내용입니다.</div>
    } else if (props.tab === 2){
      return <div>2번째 내용입니다.</div>
    }
    

  }
function Info(props) {
    return(
      <p> 재고 : {props.stock}  </p>
  
    );
  }
function stateToProps(state){
    console.log(state);
    return{
        state : state.reducer,
        alertOpen : state.reducer2
    }
}

export default connect(stateToProps)(Detail)

  //export default Detail;