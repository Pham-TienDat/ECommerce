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
    <h1 className="p-3 fixed-top bg-white">Giỏ hàng</h1>
    {cart.length==0?(<h2 className="text-center">Không có sản phẩm</h2>):(
    <div>
    <div style={{paddingTop: '5rem',paddingBottom:"5rem"}}>
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
            <th scope="row"><input className=" form-check-input me-1 align-middle" type="checkbox" value="" checked={selectedIds.has(p.id)} onChange={()=>handleItemSelect(p.id,p.price*p.quantity)}/></th>
            <td><img src={p.image} height="100"/> {p.product_name}</td>
            <td className="text-center align-middle">{Number(p.price).toLocaleString('vi-VN')}</td>
            <td className="text-center align-middle">{p.quantity}</td>
            <td className="text-center align-middle">{Number(p.price*p.quantity).toLocaleString('vi-VN')}</td>
            <td className="align-middle"><button onClick={()=>{handleDelete(p.id,p.price*p.quantity)}}>Xóa</button> </td>
          </tr>
        ))}
  </tbody>
  </table>
  </div>
    <div className="d-flex fixed-bottom bg-secondary-subtle p-4 align-items-center gap-4">
      <div className="ms-auto fw-bold">Tổng cộng: {Number(count/2).toLocaleString('vi-VN')}</div>
      <button className="btn btn-secondary">Mua hàng</button>
      <button className="btn btn-secondary" onClick={handleDeleteAll}>Xóa tất cả</button>
    </div>
    </div>)
}
</div>
    )
}
