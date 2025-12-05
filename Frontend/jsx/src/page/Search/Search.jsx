import Header from "../Home/Header/Header";
import {ProductContext} from "../../ProductContext";
import {useContext} from 'react';
import { Link } from "react-router-dom";
export default function Search(){
    const { products } = useContext(ProductContext);
    
    return(
      <>
      <div className="fixed-top">
       <Header />
      </div>
      <div className="container-fluid" style={{paddingTop: '10rem'}}>
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4">
        {products.map(p => (
          <Link to={`/product/${p.id}`} state={{ product: p }} key={p.id} className='col text-decoration-none' >
            <div className="card h-100">
            <img src={p.image} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <div>{p.price}</div>
            </div>
            </div>
            
          </Link>
        ))}
      
      </div>
      </div>
      </>
    );
}