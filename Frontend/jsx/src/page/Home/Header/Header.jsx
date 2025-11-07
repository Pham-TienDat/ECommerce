import logo from '../../../assets/logo.jpg'
import gioHang from '../../../assets/gioHang.jpeg'
import React from 'react'
import "./Header.css"
import SearchBar from './SearchBar'
import { useContext } from "react";
import { useNavigate,Link} from "react-router-dom";
import { AuthContext } from "../../../AuthContext"; // import context
export default function Header(){
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleCartClick = () => {
    if (!user) {
      navigate("/login",{ state: { from: "/cart"} });     // Chưa login → chuyển sang login
    } else {
      navigate("/cart");      // Đã login → cho vào giỏ hàng
    }
  };
  const handleLogout = () =>{
    localStorage.removeItem("username"); // xóa key "user"
  }
    return(
    <div className="box">
    <header>
      <a href="/">
         <img src={logo} className="logoS"/>
      </a>
    </header> 
    <SearchBar/>
    <img src={gioHang}
    className="gioHang"
    onClick={handleCartClick}/>
    <div className="loginSignup">
      {!user ? (
  <>
    <Link to="/login" style={{ borderRight: '1px solid black', padding: '10px' }}>
      Đăng nhập
    </Link>
    <Link to="/signup" style={{ padding: '10px' }}>
      Đăng ký
    </Link>
  </>
) : (
  <>
    <span>Xin chào, {user}</span>
    <a href="/">
         <button onClick={handleLogout}> Đăng xuất </button>
      </a>
    
  </>
)}
    
    </div>
    </div>
    )
}