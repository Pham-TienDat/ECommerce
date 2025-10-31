import logo from '../../../assets/logo.jpg'
import React from 'react'
import "./Header.css"
import SearchBar from './SearchBar'
import { Link } from "react-router-dom";
export default function Header(){
    return(
    <div className="box">
    <header>
      <a href="/">
         <img src={logo} className="logoS"/>
      </a>
    </header> 
    <SearchBar/>
    <div className="loginSignup">
    <Link to= "/login" style={{ borderRight: '1px solid black', padding:'10px' }}>Đăng nhập</Link>
    <Link to= "/signup" style={{padding:'10px'}}>Đăng ký</Link>
    </div>
    </div>
    )
}