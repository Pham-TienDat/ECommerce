import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function OrderSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const orderId = state?.orderId;

  // Nếu user reload hoặc vào trực tiếp → quay về trang chủ
  useEffect(() => {
    if (!orderId) {
      navigate("/");
    }
  }, [orderId, navigate]);

  if (!orderId) return null;

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow-sm text-center p-4" style={{ maxWidth: "500px", width: "100%" }}>
        
        <div className="mb-3">
          <div
            className="rounded-circle bg-success text-white d-inline-flex justify-content-center align-items-center"
            style={{ width: 70, height: 70, fontSize: 32 }}
          >
            ✓
          </div>
        </div>

        <h3 className="text-success mb-2">Đặt hàng thành công!</h3>
        <p className="text-muted">
          Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi.
        </p>

        <div className="alert alert-light border mt-3">
          <strong>Mã đơn hàng:</strong> #{orderId}
        </div>

        <p className="small text-muted">
          Nhân viên sẽ liên hệ với bạn để xác nhận đơn hàng trong thời gian sớm nhất.
        </p>

        <div className="d-flex justify-content-center gap-2 mt-4">
          <Link to={`/orders/${orderId}`} style={{ textDecoration: "none" }} className="btn btn-primary">
            Xem đơn hàng
          </Link>

          <Link to="/" className="btn btn-outline-secondary">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
}