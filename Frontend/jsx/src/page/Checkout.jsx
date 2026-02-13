import { useLocation, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import api from "../api/axios";
import muiten from '../assets/images.png'

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cartItems = state?.items || [];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });
  
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      const res = await api.post("/orders", {
        items: cartItems,
        customer: form,
        total: totalPrice,
        payment_method: paymentMethod,
      });

      navigate("/order-success",{
  state: {
    orderId: res.data.orderId,
    totalPrice: totalPrice
  }
});
    } catch (err) {
      alert("Đặt hàng thất bại");
    }
  };

  useEffect(() => {
  api.post("/user", {
    user_id: localStorage.getItem("user_id")
  })
  .then((res) => {
    const user = res.data.user[0];

    setForm({
  name: user.name || "",
  phone: user.phonenumber || "",
  address: user.address || "",
  note: ""
});
  })
  .catch(err => console.error(err));
  
}, []);

  return (
    <div className="container my-5">
      <div className="container bg-white d-flex align-items-center p-3" >
          <button onClick={() => navigate(-1)} className="position-relative rounded-circle border border-dark d-flex justify-content-center align-items-center" style={{ width: 45, height: 45 }}>
          <img src={muiten} height="30" style={{ transform: "rotate(180deg)"  }}></img>
          </button>
          <h2 className="position-absolute start-50 translate-middle-x p-3">Xác nhận đơn hàng</h2>
          </div>

      {/* THÔNG TIN NGƯỜI NHẬN */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header fw-bold">
          Thông tin nhận hàng
        </div>
        <div className="card-body row g-3">
          <div className="col-md-6">
            <input
              className="form-control"
              name="name"
              placeholder="Họ tên"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              name="phone"
              placeholder="Số điện thoại"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <input
              className="form-control"
              name="address"
              placeholder="Địa chỉ nhận hàng"
              value={form.address}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <textarea
              className="form-control"
              rows="2"
              name="note"
              placeholder="Ghi chú cho người bán (tuỳ chọn)"
              value={form.note}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

        {/* DANH SÁCH SẢN PHẨM */}
          <div className="card shadow-sm">
            <div className="card-header fw-bold">
            Danh sách sản phẩm
            </div>
            <div className="card-body p-0">
              <table className="table mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Sản phẩm</th>
                    <th className="text-center">SL</th>
                    <th className="text-end">Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.product_name}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-end">
                        {(item.price * item.quantity).toLocaleString()}đ
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>

        {/* TỔNG TIỀN */}
          <div className="card shadow-sm mt-5">
            <div className="card-body">
             <h5>Chi tiết thanh toán</h5>
             <div className="d-flex justify-content-between">
                <div>Tổng giá sản phẩm: </div> <div>{totalPrice.toLocaleString()}đ</div>
             </div>
             <div className="d-flex justify-content-between">
                <div>Phí giao hàng: </div> <div>20.000đ</div>
             </div>
             <div className="d-flex justify-content-between">
                <div>Phụ phí: </div> <div>3.000đ</div>
             </div>
              <h5 className=" mt-3">Tổng thanh toán</h5>
              <h3 className="text-danger">
                {(totalPrice + 20000 + 3000).toLocaleString()}đ
              </h3>
    <div className="form-check">
  <input
    className="form-check-input"
    type="radio"
    name="payment"
    id="cod"
    value="cod"
    checked={paymentMethod === "cod"}
    onChange={(e) => setPaymentMethod(e.target.value)}
  />
  <label className="form-check-label" htmlFor="cod">
    💵 Thanh toán khi nhận hàng
  </label>
</div>

<div className="form-check">
  <input
    className="form-check-input"
    type="radio"
    name="payment"
    id="bank"
    value="bank"
    checked={paymentMethod === "bank"}
    onChange={(e) => setPaymentMethod(e.target.value)}
  />
  <label className="form-check-label" htmlFor="bank">
    💳 Chuyển khoản ngân hàng
  </label>
</div>
              
            
              <button
                className="btn btn-danger w-100 mt-3"
                onClick={handleSubmit}
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
  );
}