import logo from '../../assets/logo.jpg'
import React from 'react'
import "./Header.css"
import SearchBar from './SearchBar'
export default function Header(){
    return(
    <div className="box">
    <header>
    <img src={logo} className="logoS"/>
    </header> 
    <SearchBar/>
    </div>
    )
}