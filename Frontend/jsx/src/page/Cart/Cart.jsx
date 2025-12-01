import axios from 'axios';
import {useEffect,useState} from 'react';
import { Link } from "react-router-dom";
export default function Cart(){
const [cart, setCart] = useState([]);
const [selectedIds, setSelectedIds] = useState(new Set());
const [selectAll, setSelectAll] = useState(false);
const [count,setCount]=useState(0);
const handleDelete = async (cartId,cost) => {
  try {
    const res = await axios.delete(`http://localhost:3000/cart/${cartId}`);
    setCart(prev => prev.filter(item => item.id !== Number(cartId)));
    if(selectedIds.has(cartId)){
    setCount(a=>{
          return a-cost*2;
        })}
  } catch (err) {
    console.error('Lỗi khi xóa:', err.response?.data || err.message);
    alert('Không thể xóa sản phẩm (backend trả lỗi hoặc không phản hồi).');
  }
};
const handleDeleteAll = async()  =>{
  try {
    const res = await axios.delete(`http://localhost:3000/cart/all`);
    setCart([]);
    setCount(0);
    setSelectAll(false);
  } catch (err) {
    console.error('Lỗi khi xóa:', err.response?.data || err.message);
    alert('Không thể xóa sản phẩm (backend trả lỗi hoặc không phản hồi).');
  }
};
const handleSelectAll = () => {
  setSelectAll(!selectAll);
  if(selectAll){
    setSelectedIds(new Set());
    setCount(0);
  }
  else{
    cart.map(p=>(
      setSelectedIds(prevSelectedIds => {
        const newSet = new Set(prevSelectedIds); 
        newSet.add(p.id)
         setCount(a=>{
          return a+p.price*p.quantity
        })
        return newSet;
    })
    ))
  }
}
useEffect(() => {
axios.get('http://localhost:3000/cart')
    .then(res => {setCart(res.data.cart);
    })
    .catch(err => console.error(err));
}, []);

const handleItemSelect = (productId,cost) => {
    setSelectedIds(prevSelectedIds => {
        const newSet = new Set(prevSelectedIds); 
        if(!newSet.has(productId)){
        newSet.add(productId);
        setCount(a=>{
          return a+cost
        })}
        else 
        { setSelectAll(false);
          newSet.delete(productId)
          setCount(a=>{
          return a-cost
        })}; 
        return newSet;
    });
};

    return(
    <div className="container vw-100">
    <h1 className="p-3 fixed-top">Giỏ hàng</h1>
    {cart.length==0?(<h2 className="text-center">Không có sản phẩm</h2>):(
    <div>
    <div className="pb-5">
   <table className="table">
  <thead>
    <tr>
      <th> <input className="form-check-input me-1" type="checkbox" value="" checked={selectAll} onChange={handleSelectAll}/> </th>
      <th scope="col">Sản phẩm</th>
      <th scope="col" className="text-center">Đơn giá</th>
      <th scope="col" className="text-center">Số lượng</th>
      <th scope="col" className="text-center">Số tiền</th>
      <th scope="col">Thao tác</th>
    </tr>
  </thead>
  <tbody>
        {cart.map(p => (
          <tr key={p.id}>
            <th scope="row"><input className="form-check-input me-1" type="checkbox" value="" checked={selectedIds.has(p.id)} onChange={()=>handleItemSelect(p.id,p.price*p.quantity)}/></th>
            <td>{p.product_name}</td>
            <td className="text-center">{p.price}</td>
            <td className="text-center">{p.quantity}</td>
            <td className="text-center">{p.price*p.quantity}</td>
            <td><button onClick={()=>{handleDelete(p.id,p.price*p.quantity)}}>Xóa</button> </td>
          </tr>
        ))}
  </tbody>
  </table>
  </div>
    <div className="d-flex fixed-bottom bg-secondary-subtle p-4 align-items-center gap-4">
      <div className="ms-auto fw-bold">Tổng cộng: {count/2}</div>
      <button className="btn btn-secondary">Mua hàng</button>
      <button className="btn btn-secondary" onClick={handleDeleteAll}>Xóa tất cả</button>
    </div>
    </div>)
}
</div>
    )
}
