import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import api from "../api/axios";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/admin/dashboard")
      .then(res => {
        setStats(res.data.stats);
        setOrders(res.data.latestOrders);
      })
      .catch(err => console.error(err));
  }, []);

  if (!stats) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div>
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* SUMMARY CARDS */}
      <div className="row mb-4">
        <StatCard title="Đơn hàng" value={stats.totalOrders} />
        <StatCard title="Doanh thu" value={`${stats.totalRevenue.toLocaleString()} ₫`} />
        <StatCard title="Sản phẩm" value={stats.totalProducts} />
        <StatCard title="Người dùng" value={stats.totalUsers} />
      </div>

      {/* LATEST ORDERS */}
      <div className="card shadow-sm">
        <div className="card-header fw-bold">
          Đơn hàng mới nhất
        </div>

        <div className="card-body p-0">
          <table className="table mb-0">
            <thead>
              <tr>
                <th>Mã</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Ngày</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{o.total_price.toLocaleString()} ₫</td>
                  <td>
                    <span className={`badge ${
                      o.status === "pending"
                        ? "bg-warning"
                        : o.status === "completed"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  <td>
                    {new Date(o.date).toLocaleString("vi-VN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}