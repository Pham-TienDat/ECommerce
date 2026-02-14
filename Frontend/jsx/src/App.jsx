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
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/AdminDashboard'
import AdminProducts from './admin/AdminProducts'
import AdminUsers from './admin/AdminUsers'
import AdminOrders from './admin/AdminOrders'
import AdminProductForm from './admin/AdminProductForm'
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
        <Route path="/admin/*" element={<AdminLayout />} >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/create" element={<AdminProductForm />} />
          <Route path="orders" element={<AdminOrders/>} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </AuthProvider>
    </>
  )
}

export default App
