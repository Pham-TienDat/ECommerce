import React, {useState,useContext} from "react";
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import kinhLup from "../../../assets/kinhLup.png";
import {ProductContext} from "../../../ProductContext";
const SearchBar = ()=>{
    const { setProducts } = useContext(ProductContext);
    const [query,setQuery] = useState("");
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
        navigate("/search"); 
    }
    return(
    <div className="d-flex">
     <input
     type= "text"
     placeholder="Tìm kiếm"
     value={query}
     onChange={handleChange}
     className="w-100"
     />
        <img src={kinhLup} height="40" onClick={handleClick}/>
     </div>
    );
};
export default SearchBar;