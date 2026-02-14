export default function AdminUsers() {
  return (
    <div>
      <h2 className="mb-4">User Management</h2>

      <table className="table table-bordered bg-white">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>dat123</td>
            <td>
              <span className="badge bg-danger">Admin</span>
            </td>
            <td>
              <button className="btn btn-secondary btn-sm">
                Change Role
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}