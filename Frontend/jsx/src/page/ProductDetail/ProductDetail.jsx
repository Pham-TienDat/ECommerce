import {useState} from 'react';
import axios from 'axios';
import {useLocation,useNavigate} from "react-router-dom";
export default function ProductDetail(){
    const location = useLocation();
    const product = location.state?.product;
    const user_id=localStorage.getItem("user_id");
    const [soLuong,setSoLuong] = useState(0);
    const navigate = useNavigate();
    const from = location.state?.from || "/";
    const handleGiam = () => {
        setSoLuong(soLuong=>(soLuong==0?0:soLuong-1));
    }
     const handleTang = () => {
        setSoLuong(soLuong=>(soLuong+1));
    }
    const handleClick = () => {
        const res =  axios.post(
        "http://localhost:3000/cart",
        { user_id: user_id,
        product_name: product.name,
        product_price: product.price,
        quantity: soLuong},
        { headers: { "Content-Type": "application/json" } }
      )
      .then(res => {
        navigate(from, { replace: true });
  })
      
    }
    return(
        <>
        <section>
            <h2>Số lượng</h2>
            <div>
                <button onClick={handleGiam}>-</button>
                <input value={soLuong} onChange={(e)=>setSoLuong(Number(e.target.value))}></input>
                <button onClick={handleTang}>+</button>
            </div>
        </section>
        <button onClick={handleClick}>Thêm vào giỏ hàng</button>
        </>
    )
}