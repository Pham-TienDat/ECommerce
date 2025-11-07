import '../Products/Products.css';
import axios from 'axios';
import {useEffect,useState} from 'react';
import { Link } from "react-router-dom";
export default function Products(){
    const [prod, setProd] = useState([]);
    useEffect(() => {
  axios.get('http://localhost:3000/products')
    .then(res => {setProd(res.data.products);
    })
    .catch(err => console.error(err));
}, []);
    return(
    <div>
    <h2>Danh sách sản phẩm</h2>
    <ul className="products">
   
        {prod.map(p => (
          <li key={p.id}>
            <Link to={`/product/${p.id}`} className="product-card">
            {p.name},{p.price}
            </Link>
          </li>
        ))}
      
    </ul>
    </div>
    )
}