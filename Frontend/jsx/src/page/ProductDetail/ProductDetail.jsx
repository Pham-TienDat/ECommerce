import {useState,useEffect} from 'react';
import api from "../../api/axios";
import axios from "axios";
import {useLocation,useNavigate} from "react-router-dom";
import Header from "../Home/Header/Header"
import DisplayRating from "../../DisplayRating"
import ProductReviewForm from '../../components/ProductReviewForm';
export default function ProductDetail(){
    const location = useLocation();
    const product = location.state?.product;
    const user_id=localStorage.getItem("user_id");
    const [soLuong,setSoLuong] = useState(0);
    const [rate,setRate] = useState([]);
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
        const res =  api.post(
        "http://localhost:3000/cart",
        { user_id: user_id,
        product_name: product.name,
        product_price: product.price,
        quantity: soLuong,
        image: product.image,
        product_id: product.id},
        { headers: { "Content-Type": "application/json" } }
      )
      .then(res => {
        alert("Thêm vào giỏ hàng thành công!✅");
        setSoLuong(0);
  })
}
    }
    useEffect(() => {
         axios.post(
        "http://localhost:3000/ratings",
        { product_id: product.id },
        { headers: { "Content-Type": "application/json" } }

      )
      .then((res) => {setRate(res.data.ratings);
      }
)
      
}, [product.id]);
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
            <p className="card-text fs-2">{Number(product.price).toLocaleString('vi-VN')}đ</p>
            
            
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
            <div>{product.description}</div>
        </div>

        <div className="container">
            <div className="fs-3">Đánh giá</div>
            <div>{rate.map(p=>(
                <div key={p.id} className="border-bottom mb-1">
                    <div>Khách hàng số {p.user_id}</div>
                   <DisplayRating ratingValue={p.rating} />
                    <div>{p.comment_text}</div>
                    <div className="text-muted small">
                    {new Date(p.created_at).toLocaleString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    })}
                </div>
                </div>
            )

            )}</div>
        </div>
        </>
    )
}