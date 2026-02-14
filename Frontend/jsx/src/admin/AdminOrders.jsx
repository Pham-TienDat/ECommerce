export default function AdminOrders() {
  return (
    <div>
      <h2 className="mb-4">Order Management</h2>

      <table className="table table-striped bg-white">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>#1001</td>
            <td>Dat</td>
            <td>$500</td>
            <td>
              <span className="badge bg-warning">Pending</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}