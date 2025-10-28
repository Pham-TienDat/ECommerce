import React, {useState} from "react";
import kinhLup from "../../assets/kinhLup.png";
const SearchBar = ({onSearch})=>{
    const [query,setQuery]=useState("");
    const handleChange=(e)=>{
        setQuery(e.target.value);
        onSearch(e.target.value);
    }
    return(
    <div className="search-container">
     <button className="searchButton">
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