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
    <div className="container-fluid">
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4">
        {prod.map(p => (
          <Link to={`/product/${p.id}`} state={{ product: p }} key={p.id} className='col text-decoration-none' >
            <div className="card h-100">
            <img src={p.image} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <div>{Number(p.price).toLocaleString('vi-VN')}đ</div>
            </div>
            </div>
            
          </Link>
        ))}
      </div>
      </div>
    </div>
    )
}