import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AdminProductForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/admin/products", form);
    navigate("/admin/products");
  };

  return (
    <div className="card p-4 shadow-sm" style={{ maxWidth: 500 }}>
      <h5 className="mb-3">Thêm sản phẩm</h5>

      <input
        className="form-control mb-3"
        placeholder="Tên sản phẩm"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="number"
        className="form-control mb-3"
        placeholder="Giá"
        value={form.price}
        onChange={e => setForm({ ...form, price: e.target.value })}
      />

      <input
        className="form-control mb-3"
        placeholder="Link ảnh"
        value={form.image}
        onChange={e => setForm({ ...form, image: e.target.value })}
      />

      <button className="btn btn-success w-100">
        Lưu
      </button>
    </div>
  );
}