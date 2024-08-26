import React, { useState } from 'react'
import { useCartDispatch, useCartState } from '../ContextReducer'

export default function Cart() {
    const [order, setOrder] = useState(false); // State to track if the order is placed
    const useremail = localStorage.getItem("Useremail")
    console.log(useremail)

    const Data = useCartState()
    const dispatch = useCartDispatch()
    const placeorder = async (e) => {
      e.preventDefault();
      const fetchData = await fetch("http://localhost:4000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "order-time": new Date().toISOString(), // Sending order time via headers
        },
        body: JSON.stringify({
          order_data: Data, // Pass the cart data
          user: useremail,
        }),
      });
      // dispatch({type: "CLEAR"})
     
      
      
    };
    
    let total=0
    let TotalPrice = Data.reduce((total ,item)=>total+item.price,0)
    console.log( TotalPrice);
    if(Data.length===0){
        return(
            <div><h2>The cart is Empty</h2></div>
        )
    }
    return(
        <div style={{minHeight:"90vh"}}>
            <table className="table table-dark table-striped">
            <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Quantity</th>
      <th scope="col">Size</th>
      <th scope="col">Amount</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {
        Data.map((item, index)=>(
            <tr key={index}>
                <th scope='row'>{index+1}</th>
                <td>{item.name}</td>
                <td>{item.qut}</td>
                <td>{item.size}</td>
                <td>{item.price}</td>
                <td><button onClick={() => { dispatch({ type: "REMOVE", index: index })}} style={{backgroundColor:"rgb(188 0 44 / 0%)", border:"#00bc8c", borderRadius:"5px"}}><ion-icon name="trash-outline"></ion-icon></button></td>
        
            </tr>
        ))
    }
  </tbody>
</table>
<div>
<h1>Total Price: {TotalPrice}</h1>
<button className="btn btn-success" onClick={placeorder} > Place Your Order</button>


</div>
        </div>
    )

      
}
