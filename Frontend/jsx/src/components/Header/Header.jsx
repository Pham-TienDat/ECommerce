import logo from '../../assets/logo.jpg'
import React from 'react'
import "./Header.css"
import SearchBar from './SearchBar'
export default function Header(){
    return(
    <div className="box">
    <header>
      <a href="/">
         <img src={logo} className="logoS"/>
      </a>
    </header> 
    <SearchBar/>
    </div>
    )
}