import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3"
        style={{ width: "250px" }}
      >
        <h4 className="mb-4">Admin Panel</h4>

        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/admin" className="nav-link text-white">
              Dashboard
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link to="/admin/products" className="nav-link text-white">
              Products
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link to="/admin/orders" className="nav-link text-white">
              Orders
            </Link>
          </li>

        </ul>
      </div>

      {/* Content */}
      <div className="flex-grow-1 p-4 bg-light">
        <Outlet />
      </div>
    </div>
  );
}