import '../Categories/Categories.css';
import axios from 'axios';
import { useEffect,useState,useContext } from 'react';
import {ProductContext} from "../../../ProductContext";
import {useNavigate} from "react-router-dom";
export default function Categories(){
    const [cats, setCats] = useState([]);
    const { setProducts } = useContext(ProductContext);
     const navigate = useNavigate();
    const handleClick = async (categories_id) => {
      const res = await axios.post(
        "http://localhost:3000/cats",
        { categories_id: categories_id },
        { headers: { "Content-Type": "application/json" } }
      );
       setProducts(res.data.products);
       navigate("/search");
    }
    //Lấy dữ liệu danh mục
    useEffect(() => {
  axios.get('http://localhost:3000/categories')
    .then(res => {setCats(res.data.categories);})
    .catch(err => console.error(err));
}, []);
    return(
    <div>
    <h2>Danh mục</h2>
    <ul className="categories">
        {cats.map(c => (
          <li className=" d-flex flex-column justify-content-between border text-center" key={c.id} onClick={()=>handleClick(c.id)}>      
            <div>{c.name}</div>
            <div style={{ height: '100px'}} className="d-flex align-items-center justify-content-center">
            <img src={c.images} className="rounded-circle" height="100"/>
            </div>
          </li>
        ))}
    </ul>
    </div>);
}