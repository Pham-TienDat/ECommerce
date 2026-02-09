import { useEffect, useState } from "react";
import api from "../api/axios"; // axios instance

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("user_id");

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
      <h3 className="mb-4 text-center">Lịch sử mua hàng</h3>

      {orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        orders.map(order => (
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
        ))
      )}
    </div>
  );
}