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
          :(<div className="container d-flex align-items-center">
         <div className="nav-item dropdown ms-auto">
  <button
    className="btn p-0 border-0 bg-transparent"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <img
      src="src/assets/account-icon-template-vector.jpg"
      className="rounded-circle"
      height="45"
      alt="account"
    />
  </button>

  <ul className="dropdown-menu dropdown-menu-end">
    <li><a className="dropdown-item" href="#">Thông tin tài khoản</a></li>
    <li><Link to= "/orderhistory" className="text-decoration-none"><a className="dropdown-item">Lịch sử mua hàng</a></Link></li>
    <li><hr className="dropdown-divider" /></li>
    <li>
      <a href="/" className="text-decoration-none">
      <button className="dropdown-item" onClick={handleLogout}>
        Đăng xuất
      </button>
      </a>
    </li>
  </ul>
</div>
          
          </div>)}
         
        <div className="container d-flex justify-content-between align-items-center">
          <a class="navbar-brand" href="/">
            <div className="h1">Home</div>
          </a>
          <div className="w-75">
            <SearchBar />
          </div>
           <img src={gioHang} height="30" onClick={handleCartClick}/>
         
         
        </div>
      </nav>
    )
}