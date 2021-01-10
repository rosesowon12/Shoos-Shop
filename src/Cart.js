/* eslint-disable */
import React from 'react';
import {Table, Button} from 'react-bootstrap';
import { connect } from 'react-redux';


 function Cart(props){
   return(
       <div>
           <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>상품명</th>
                <th>수량</th>
                <th>변경</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.state.map((a,i)=>{
                        return(
                            <tr key={i}>
                                <td>{a.id}</td>
                                <td>{a.name}</td>
                                <td>{a.quan}</td>
                                <td><button onClick={()=>{
                                    props.dispatch({ type : '수량증가', payload : a.id})
                                    }}> + </button>
                                    <button onClick={()=>{
                                    props.dispatch({ type : '수량감소', payload : a.id})
                                    }}> - </button> </td>
                            </tr>
                        )

                    })
                }
               
            </tbody>
            </Table>
            { props.alertOpen === true
            ?   (<div className="my-alert">
                <p>지금 구매 하시면 신규 할인 20%</p>
                <button onClick={()=>{
                    props.dispatch({ type : '닫기'})
                }}>닫기</button>
                </div>)
            : null
            }  
       </div>
   ) 
}

function stateToProps(state){
    console.log(state);
    return{
        state : state.reducer,
        alertOpen : state.reducer2
    }
}

export default connect(stateToProps)(Cart)

//export default Cart;