import {useState} from 'react';
import axios from 'axios';
import {useLocation,useNavigate} from "react-router-dom";
import Header from "../Home/Header/Header"
export default function ProductDetail(){
    const location = useLocation();
    const product = location.state?.product;
    const user_id=localStorage.getItem("user_id");
    const [soLuong,setSoLuong] = useState(0);
    const navigate = useNavigate();
    const from = location.state?.from || "/cart";
    const handleGiam = () => {
        setSoLuong(soLuong=>(soLuong==0?0:soLuong-1));
    }
     const handleTang = () => {
        setSoLuong(soLuong=>(soLuong+1));
    }
    const handleClick = () => {
        if(soLuong>0){
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
    }

    return(
        <>
        <div className="fixed-top">
        <Header/>
        </div>

        <div className="container " style={{paddingTop: '10rem'}}>
            <div className="card mb-3 ">
            <div className="row g-2">
            <div className="col-lg-5">
            <img src={product.image} height="400rem"/>
            </div>
            <div className="col-lg-7">
            <div className="card-body">
            <h5 className="card-title fs-2 fw-bold">{product.name}</h5>
            <p className="card-text fs-2">{product.price}đ</p>
            
            
            <div className="d-flex">
                <div className="fs-3 px-3">Số lượng: </div>
                <button onClick={handleGiam}>-</button>
                <input className="text-center" value={soLuong} onChange={(e)=>setSoLuong(Number(e.target.value))}></input>
                <button onClick={handleTang}>+</button>
            </div>
            <div className="py-3">
            <button  onClick={handleClick}>Thêm vào giỏ hàng</button>
            </div>
            </div>
        </div>
        </div>
        </div>
        </div>
        
        <div className="container">
            <div className="fs-3">Mô tả sản phẩm</div>
            <div></div>
        </div>

        <div className="container">
            <div className="fs-3">Đánh giá</div>
            <div></div>
        </div>
        
        </>
    )
}