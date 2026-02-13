import { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import api from "../api/axios"; // axios instance
import muiten from '../assets/images.png'

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();
  useEffect(() => {
  api.get("/orders")
    .then(res => {
      setOrders(res.data.orders);
    })
    .catch(err => {
      console.error("Lỗi lấy lịch sử đơn hàng:", err);
    });
}, []);

  return (
    <div className="container mt-4">
    
      <div className="container bg-white d-flex align-items-center p-3" >
          <button onClick={() => navigate(-1)} className="position-relative rounded-circle border border-dark d-flex justify-content-center align-items-center" style={{ width: 45, height: 45 }}>
          <img src={muiten} height="30" style={{ transform: "rotate(180deg)"  }}></img>
          </button>
          <h2 className="position-absolute start-50 translate-middle-x p-3">Lịch sử mua hàng</h2>
          </div>

      {orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        orders.map(order => (
          <Link to={`/orders/${order.id}`} style={{ textDecoration: "none" }}>
          <div key={order.id} className="card mb-3 shadow-sm">
            <div className="card-header d-flex justify-content-between">
              <div>
                <strong>Mã đơn #{order.id}</strong>
                <div className="text-muted">
                  {new Date(order.date).toLocaleString("vi-VN")}
                </div>
              </div>

              <div className="text-end">
                <div className="fw-bold text-danger">
                  {order.total_price.toLocaleString()} ₫
                </div>
                <span className={`badge ${
                  order.status === "completed"
                    ? "bg-success"
                    : order.status === "pending"
                    ? "bg-warning"
                    : "bg-secondary"
                }`}>
                  {order.status}
                </span>
              </div>
            </div>

            <div className="card-body">
              {order.items.map(item => (
                <div key={item.id} className="d-flex mb-3">
                  <div className="flex-grow-1">
                    <div>{item.name}</div>
                    <small className="text-muted">
                      {item.quantity} × {item.price.toLocaleString()} ₫
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </Link>
        ))
      )}
    </div>
  );
}