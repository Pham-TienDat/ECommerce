import Header from "../Home/Header/Header";
import {ProductContext} from "../../ProductContext";
import {useContext} from 'react';
export default function Search(){
    const { products } = useContext(ProductContext);
    return(
        <>
       <Header />
        <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name},{p.price},{p.shop}
          </li>
        ))}
      
    </ul>

        
        </>
    );
}