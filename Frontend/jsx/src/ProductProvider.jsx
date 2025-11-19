import {ProductContext} from './ProductContext';
import {useState} from 'react';
export const ProductProvider = ({children}) => {
    const [products,setProducts] = useState([]);
    return(
        <ProductContext.Provider value={{products,setProducts}}>
            {children}
        </ProductContext.Provider>
    );
}