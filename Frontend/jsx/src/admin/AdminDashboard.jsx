export default function AdminDashboard() {
  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>

      <div className="row">
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h5>Total Orders</h5>
            <h3>120</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h5>Total Products</h5>
            <h3>58</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h5>Total Users</h5>
            <h3>340</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h5>Revenue</h5>
            <h3>$12,500</h3>
          </div>
        </div>
      </div>
    </div>
  );
}