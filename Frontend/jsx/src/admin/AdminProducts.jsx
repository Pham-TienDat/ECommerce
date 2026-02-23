import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import api from "../api/axios";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/products");

      // Nếu backend trả về mảng trực tiếp
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      }
      // Nếu backend trả về { products: [...] }
      else {
        setProducts(res.data.products || []);
      }

    } catch (err) {
      setError("Không tải được danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Nếu đang ở route con (create hoặc edit)
  const isSubRoute = location.pathname !== "/admin/products";

  return (
    <div>

      {/* Nếu là create/edit thì chỉ render Outlet */}
      {isSubRoute ? (
        <Outlet />
      ) : (
        <>
          <div className="d-flex justify-content-between mb-3">
            <h4>Sản phẩm</h4>
            <Link to="create" className="btn btn-primary">
              + Thêm sản phẩm
            </Link>
          </div>

          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          {loading ? (
            <div>Đang tải...</div>
          ) : (
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
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      Không có sản phẩm nào
                    </td>
                  </tr>
                ) : (
                  products.map(p => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.name}</td>
                      <td>{Number(p.price).toLocaleString()} ₫</td>
                      <td>
                        <Link
                          to={`${p.id}/edit`}
                          className="btn btn-sm btn-warning me-2"
                        >
                          Sửa
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(p.id)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </>
      )}

    </div>
  );

  async function handleDelete(id) {
    if (!window.confirm("Bạn chắc chắn muốn xóa?")) return;

    try {
      await api.delete(`/admin/products/${id}`);
      fetchProducts();
    } catch {
      alert("Xóa thất bại");
    }
  }
}