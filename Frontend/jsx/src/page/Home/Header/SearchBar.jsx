import React, {useState,useContext} from "react";
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import kinhLup from "../../../assets/kinhLup.png";
import {ProductContext} from "../../../ProductContext";
const SearchBar = ()=>{
    const { setProducts } = useContext(ProductContext);
    const [query,setQuery]=useState("");
    const navigate = useNavigate();
    const handleChange=(e)=>{
        setQuery(e.target.value);
    }
    const handleClick = async() =>{
        const res = await axios.post(
        "http://localhost:3000/search",
        { search: query },
        { headers: { "Content-Type": "application/json" } }
      );
        setProducts(res.data.products);
        console.log(res);
        navigate("/search"); 
    }
    return(
    <div className="search-container">
     <button className="searchButton" onClick={handleClick}>
        <img src={kinhLup} className="searchIcon"/>
     </button>
     <input
     type= "text"
     placeholder="Tìm kiếm"
     value={query}
     onChange={handleChange}
     className="search"
     />
     </div>
    );
};
export default SearchBar;