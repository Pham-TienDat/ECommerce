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

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    if (!form.name.trim()) return "Tên sản phẩm không được để trống";
    if (!form.price || Number(form.price) <= 0)
      return "Giá phải lớn hơn 0";
    if (!form.image.trim()) return "Link ảnh không được để trống";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.post("/admin/products", {
        name: form.name.trim(),
        price: Number(form.price),
        image: form.image.trim()
      });

      navigate("/admin/products", { replace: true });

    } catch (err) {
      setError(
        err.response?.data?.message || "Lỗi khi tạo sản phẩm"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4 shadow-sm" style={{ maxWidth: 500 }}>
      <h5 className="mb-3">Thêm sản phẩm</h5>

      {error && (
        <div className="alert alert-danger py-2">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          className="form-control mb-3"
          placeholder="Tên sản phẩm"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          className="form-control mb-3"
          placeholder="Giá"
          value={form.price}
          onChange={handleChange}
        />

        <input
          name="image"
          className="form-control mb-3"
          placeholder="Link ảnh"
          value={form.image}
          onChange={handleChange}
        />

        <button
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? "Đang lưu..." : "Lưu sản phẩm"}
        </button>

      </form>
    </div>
  );
}