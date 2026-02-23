import { useEffect, useState } from "react";
import api from "../api/axios";

const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "shipped",
  "completed",
  "cancelled"
];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/orders");
      setOrders(res.data);
    } catch (err) {
      setError("Không tải được đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChangeStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, {
        status: newStatus
      });
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Cập nhật thất bại");
    }
  };

  const renderBadge = (status) => {
    const map = {
      pending: "bg-warning",
      confirmed: "bg-info",
      shipped: "bg-primary",
      completed: "bg-success",
      cancelled: "bg-danger"
    };
    return (
      <span className={`badge ${map[status] || "bg-secondary"}`}>
        {status}
      </span>
    );
  };

  return (
    <div>
      <h2 className="mb-4">Order Management</h2>

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {loading ? (
        <div>Đang tải...</div>
      ) : (
        <table className="table table-striped bg-white shadow-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Change</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Không có đơn hàng
                </td>
              </tr>
            ) : (
              orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.username}</td>
                  <td>
                    {Number(order.total_price).toLocaleString()} ₫
                  </td>
                  <td>{renderBadge(order.status)}</td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={order.status}
                      disabled={order.status === "completed"}
                      onChange={(e) =>
                        handleChangeStatus(order.id, e.target.value)
                      }
                    >
                      {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}