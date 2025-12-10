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
  const handleBought = () =>{
    navigate("/bought");
  }
    return(
      <nav className="navbar bg-light">
        {!user?(<div className="container d-flex">
            <Link to="/login" className="ms-auto" style={{ borderRight: '1px solid black', padding: '10px' }}>Đăng nhập</Link>
            <Link to="/signup" style={{ padding: '10px' }}>Đăng ký</Link>
          </div>)
          :(<div className="container d-flex">
          <span className="ms-auto">Xin chào {user} </span>
          <a href="/">
          <button onClick={handleLogout}> Đăng xuất </button>
          </a>
          </div>)}
         
        <div className="container d-flex justify-content-between align-items-center">
          <a class="navbar-brand" href="#">
            <img src={logo} height="70"/>
          </a>
          <div className="w-75">
            <SearchBar />
          </div>
           <img src={gioHang} height="30" onClick={handleCartClick}/>
         
         
        </div>
      </nav>
    )
}