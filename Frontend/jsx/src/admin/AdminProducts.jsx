import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import api from "../api/axios";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/admin/products").then(res => {
      setProducts(res.data.products);
    });
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h4>Sản phẩm</h4>
        <Link to="/admin/products/create" className="btn btn-primary">
          + Thêm sản phẩm
        </Link>
        <Outlet />
      </div>

      <table className="table table-bordered bg-white shadow-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price.toLocaleString()} ₫</td>
              <td>
                <Link
                  to={`/admin/products/${p.id}/edit`}
                  className="btn btn-sm btn-warning me-2"
                >
                  Sửa
                </Link>
                <button className="btn btn-sm btn-danger">
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}