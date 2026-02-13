import Home from './page/Home/Home'
import Login from './page/Login'
import SignUp from './page/SignUp'
import ProductDetail from './page/ProductDetail/ProductDetail'
import Cart from './page/Cart/Cart'
import Search from './page/Search/Search'
import Checkout from './page/Checkout'
import OrderHistory from './page/OrderHistory'
import OrderSuccess from './page/OrderSuccess'
import OrderDetail from './page/OrderDetail'
import Profile from './page/Profile'
import { AuthProvider } from "./AuthContext";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
   <>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/search" element={<Search/>} />   
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/orderhistory" element={<OrderHistory/>} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </AuthProvider>
    </>
  )
}

export default App
