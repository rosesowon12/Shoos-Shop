/* eslint-disable */
import React, {useContext, useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import {stockContext} from './App.js';

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
              }}>주문하기</button> 
              <button className="btn btn-danger" onClick={()=>{
                history.goBack();
              }}>뒤로가기</button> 
           
            </div>
          </div>
        </div> 
    )
   }

  function Info(props) {
    return(
      <p> 재고 : {props.stock}  </p>
  
    );
    
  }


  export default Detail;