export default function StatCard({ title, value }) {
  return (
    <div className="col-md-3">
      <div className="card shadow-sm text-center p-3">
        <h6 className="text-muted">{title}</h6>
        <h4 className="fw-bold">{value}</h4>
      </div>
    </div>
  );
}