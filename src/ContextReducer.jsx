import React, { useReducer, useContext, createContext, useEffect } from 'react';

// Define the context for the cart state and dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();


// Define your reducer logic
const cartReducer = (state, action) => {
   switch (action.type) {
    case "ADD":
    
     return [...state, {id:action.id,name:action.name,img:action.img,qut:action.qut,size:action.size,price:action.price}] 
    
     case "REMOVE":
      let newArr = [...state]
      newArr.splice(action.index, 1)
      return newArr;

      case "UPDATE":
  return state.map((item) =>
    item.id === action.id && item.size === action.size
      ? { ...item, qut: action.qut, price: action.price }
      : item
  );
  case "CLEAR":
    return []
   

      


    default:
      return state;
   }
  
};

// Create the CartProvider component
export const CartProvider = ({ children }) => {

  // Load initial cart state from local storage if there somthing data in local storage
  const initialState = JSON.parse(localStorage.getItem('cart')) || [];

  const [cartState, cartDispatch] = useReducer(cartReducer, initialState );
  //whenever state change of cart saving it to local storage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState));
  }, [cartState]);

  return (
    <CartDispatchContext.Provider value={cartDispatch}>
      <CartStateContext.Provider value={cartState}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Custom hooks to access the cart state and dispatch
export const useCartState = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
