import { useState } from 'react';
import {BrowserRouter as Router, Route,  Routes} from 'react-router-dom'
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Home from './screen/Home';
import Login from './screen/Login';
import Signup from './screen/Signup';
import FoodItem from './screen/FoodItem';
import { CartProvider } from './ContextReducer';
import Cart from './screen/cart';
import MyOrder from './screen/MyOrder';
// import Service from './screen/Services';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <CartProvider>

    <Router>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/fooditem' element={<FoodItem/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/myorder' element={<MyOrder/>}/>
       
      </Routes>
      {/* <Service/> */}
    <Footer/>
    </Router>
   
    </CartProvider>



   
    </>
  )
}

export default App
