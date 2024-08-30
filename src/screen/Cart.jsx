import React, { useState } from 'react'
import { useCartDispatch, useCartState } from '../ContextReducer'

export default function Cart() {
    const [order, setOrder] = useState(false); // State to track if the order is placed
    const useremail = localStorage.getItem("Useremail")
    console.log(useremail)

    const Data = useCartState()
    const dispatch = useCartDispatch()


  const handleCardClick = async (id, price) => {
    console.log("Item clicked with ID:", id);
    const item = data.find((item) => item._id === id);
    if (item) {
      setSelectedItem(item);
      console.log('Selected item:', item); // Logging item to verify
  
      const token = localStorage.getItem('AuthToken');
      if (!token) {
        console.error('No AuthToken found. Please log in.');
        return;
      } else {
        console.log('Token:', token);
      }
  
      try {
        // Decode the token to get the user ID
        const decodedToken = parseJwt(token);
        const userId = decodedToken ? decodedToken.user_id : null;
        if (!userId) {
          throw new Error('User ID not found in token.');
        }
        console.log('User ID:', userId);
  
        const response = await fetch('http://localhost:4000/api/auth/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            itemId: item._id,
            name: item.name,
            price: price, // Send price here
            quantity: 1,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
  
        const result = await response.json();
        console.log('Item added to cart successfully:', result);
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    }
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
<button className="btn btn-success" onClick={() => handleCardClick(item.id, item.price)} > Place Your Order</button>


</div>
        </div>
    )

      
}