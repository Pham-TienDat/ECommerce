import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import muiten from '../assets/images.png'

export default function OrderDetail() {
  const { id } = useParams();          // orderId từ URL
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/orders/${id}`)
      .then(res => {
        setOrder(res.data.order);
      })
      .catch(err => {
        console.error(err);
        navigate("/orders"); // không có đơn → quay lại list
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" />
      </div>
    );
  }

  if (!order) return null;

  return (
   <div className="container mt-4">

  {/* HEADER */}
  <div className="d-flex align-items-center mb-4">
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="rounded-circle border border-dark d-flex justify-content-center align-items-center me-2"
      style={{ width: 45, height: 45 }}
    >
      <img
        src={muiten}
        height="30"
        alt="back"
        style={{ transform: "rotate(180deg)" }}
      />
    </button>

    <h4 className="mb-0">Chi tiết đơn hàng #{order.id}</h4>
  </div>

  {/* THÔNG TIN ĐƠN */}
  <div className="card mb-4">
    <div className="card-body row">
      <div className="col-md-6">
        <p><strong>Ngày đặt:</strong>{" "}
          {new Date(order.created_at).toLocaleString("vi-VN")}
        </p>
        <p><strong>Trạng thái:</strong>{" "}
          <span className={`badge ${
            order.status === "pending"
              ? "bg-warning"
              : order.status === "completed"
              ? "bg-success"
              : "bg-secondary"
          }`}>
            {order.status}
          </span>
        </p>
      <p>
  <strong>Thanh toán:</strong>{" "}
  {order.payment_method === "COD"
    ? "Tiền mặt"
    : order.payment_method === "bank"
    ? "Chuyển khoản ngân hàng"
    : "Không xác định"}
</p>
      </div>

      <div className="col-md-6">
        <p><strong>Người nhận:</strong> {order.customer.name}</p>
        <p><strong>SĐT:</strong> {order.customer.phone}</p>
        <p><strong>Địa chỉ:</strong> {order.customer.address}</p>
      </div>
    </div>
  </div>

  {/* DANH SÁCH SẢN PHẨM */}
<div className="card">
  <div className="card-header fw-bold">Sản phẩm</div>

  <div className="card-body">
    {order.items.map(item => (
      <div
        key={item.order_item_id}
        className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3"
      >
        <div className="flex-grow-1">
          <div className="fw-semibold">{item.product_name}</div>
          <small className="text-muted">
            {item.quantity} × {item.order_price.toLocaleString()} ₫
          </small>
        </div>

        <div className="text-end">
          <div className="fw-bold text-danger mb-2">
            {(item.quantity * item.order_price).toLocaleString()} ₫
          </div>

          {/* NÚT ĐÁNH GIÁ */}
          {order.status?.toLowerCase().trim() === "completed" && (
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() =>
                navigate(`/product-review/${item.product_id}`, {
                  state: {
                    orderId: order.id,
                    orderItemId: item.order_item_id,
                    productId: item.product_id
                  }
                })
              }
            >
              Đánh giá
            </button>
          )}
        </div>
      </div>
    ))}
  </div>

    {/* TỔNG TIỀN */}
    <div className="card-footer">
      <div className="d-flex justify-content-between">
        <span>Tổng giá sản phẩm:</span>
        <span>{order.total_price.toLocaleString()} ₫</span>
      </div>
      <div className="d-flex justify-content-between">
        <span>Phí giao hàng:</span>
        <span>20.000 ₫</span>
      </div>
      <div className="d-flex justify-content-between">
        <span>Phụ phí:</span>
        <span>3.000 ₫</span>
      </div>

      <hr />

      <div className="d-flex justify-content-between fw-bold fs-5">
        <span>Tổng thanh toán:</span>
        <span className="text-danger">
          {(order.total_price + 20000 + 3000).toLocaleString()} ₫
        </span>
      </div>
    </div>
  </div>

  {/* NÚT TIẾP TỤC */}
  <div className="d-flex justify-content-center mt-5">
    <Link to="/" className="btn btn-danger">
      Tiếp tục mua sắm
    </Link>
  </div>

</div>

  );
}