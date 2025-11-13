import axios from 'axios';
import {useEffect,useState} from 'react';
import { Link } from "react-router-dom";
export default function Cart(){
const [cart, setCart] = useState([]);
const handleDelete = async (cartId) => {
  try {
    const res = await axios.delete(`http://localhost:3000/cart/${cartId}`);
    setCart(prev => prev.filter(item => item.id !== Number(cartId)));
  } catch (err) {
    console.error('Lỗi khi xóa:', err.response?.data || err.message);
    alert('Không thể xóa sản phẩm (backend trả lỗi hoặc không phản hồi).');
  }
};
const handleDeleteAll = async()  =>{
  try {
    const res = await axios.delete(`http://localhost:3000/cart/all`);
    setCart([]);
  } catch (err) {
    console.error('Lỗi khi xóa:', err.response?.data || err.message);
    alert('Không thể xóa sản phẩm (backend trả lỗi hoặc không phản hồi).');
  }
};

useEffect(() => {
axios.get('http://localhost:3000/cart')
    .then(res => {setCart(res.data.cart);
    })
    .catch(err => console.error(err));
}, []);
    return(
    <div>
    <h2>Giỏ hàng</h2>
    <ul>
        {cart.map(p => (
          <li key={p.id}>
            {p.product_name},{p.price},{p.quantity},{p.price*p.quantity}
            <button>Đặt hàng</button>
            <button onClick={()=>{handleDelete(p.id)}}>Xóa</button>
          </li>
        ))}
      
    </ul>
    <button onClick={handleDeleteAll}>Xóa tất cả</button>
    </div>
    )
}