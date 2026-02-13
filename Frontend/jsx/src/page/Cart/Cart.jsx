import api from "../../api/axios";
import {useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
import muiten from '../../assets/images.png'
export default function Cart(){
const [cart, setCart] = useState([]);
const [selectedIds, setSelectedIds] = useState(new Set());
const [selectAll, setSelectAll] = useState(false);
const [count,setCount]=useState(0);
const navigate = useNavigate();
const handleDelete = async (cartId,cost) => {
  try {
    const res = await api.delete(`/cart/${cartId}`);
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
    const res = await api.delete("/cart/all");
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

const handleCheckout = () => {
  const selectedItems = cart.filter(item =>
    selectedIds.has(item.id)
  );

  if (selectedItems.length === 0) {
    alert("Vui lòng chọn sản phẩm để mua");
    return;
  }

  navigate("/checkout", {
    state: {
      items: selectedItems
    }
  });
};


useEffect(() => {
api.get("/cart")
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
    <div className="container fixed-top  bg-white d-flex align-items-center p-3" >
    <button onClick={() => navigate(-1)} className="position-relative rounded-circle border border-dark d-flex justify-content-center align-items-center" style={{ width: 45, height: 45 }}>
    <img src={muiten} height="30" style={{ transform: "rotate(180deg)"  }}></img>
    </button>
    <h1 className="position-absolute start-50 translate-middle-x p-3">Giỏ hàng</h1>
    </div>
    {cart.length===0?(<h2  className="text-center" style={{paddingTop: '10rem'}}>Không có sản phẩm</h2>):(
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
      <button onClick={handleCheckout} className="btn btn-secondary">Mua hàng</button>
      <button className="btn btn-secondary" onClick={handleDeleteAll}>Xóa tất cả</button>
    </div>
    </div>)
}
</div>

    )
}
