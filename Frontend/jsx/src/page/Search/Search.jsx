import Header from "../Home/Header/Header";
import {ProductContext} from "../../ProductContext";
import {useContext,useState} from 'react';
import { Link } from "react-router-dom";
export default function Search(){
    const { products,setProducts } = useContext(ProductContext);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const filteredProducts = products.filter(item => {
        const min = Number(minPrice) === "" ? 0 : Number(minPrice);
        const max = maxPrice === "" ? Infinity : Number(maxPrice);
        return item.price >= min && item.price <= max;
    });
    const handleSort = (type) => {
  const sortedProducts = [...products].sort((a, b) => {
    if (type === 'asc') {
      return a.price - b.price; // Giá thấp đến cao
    } else {
      return b.price - a.price; // Giá cao đến thấp
    }
  });
  setProducts(sortedProducts);
  };
    return(
      <>
      <div className="fixed-top">
       <Header />
      </div>
      <div className="container-fluid" style={{paddingTop: '9rem'}}> 
        <div  className="mb-3 d-flex gap-3 align-items-center">
        <div className="">
        <input
              type= "text"
              placeholder="Nhập giá thấp nhất"
              value={minPrice}
              onChange={(e)=>setMinPrice(e.target.value)}
              className="form-control"/>
        <input
              type= "text"
              placeholder="Nhập giá cao nhất"
              value={maxPrice}
              onChange={(e)=>setMaxPrice(e.target.value)}
              className="form-control"/>
        </div>
        <div className="d-flex flex-column">
          <button onClick={() => handleSort('asc')}>Giá tăng dần ↑</button>
          <button onClick={() => handleSort('desc')}>Giá giảm dần ↓</button>
        </div>
        </div>
        
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4">
        {filteredProducts.map(p => (
          <Link to={`/product/${p.id}`} state={{ product: p }} key={p.id} className='col text-decoration-none' >
            <div className="card h-100">
            <img src={p.image} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <div>{Number(p.price).toLocaleString("vi-VN")}đ</div>
            </div>
            </div>
          </Link>
        ))}
      </div>
      </div>
      </>
    );
}