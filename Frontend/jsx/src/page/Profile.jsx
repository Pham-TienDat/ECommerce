import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import muiten from '../assets/images.png'

export default function Profile() {
    const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: ""
  });
   
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: ""
  });
  // Lấy thông tin user
  useEffect(() => {
    api.get("/me").then(res => {
      setUser(res.data.user);
      setForm({
        name: res.data.user.name || "",
        phone: res.data.user.phonenumber || "",
        address: res.data.user.address || ""
      });
    });
  }, []);

  // Cập nhật thông tin
  const handleUpdate = async () => {
    await api.put("/me", form);
    alert("Cập nhật thành công!");
  };

  // Đổi mật khẩu
  const handleChangePassword = async () => {
    await api.put("/me/password", passwordForm);
    alert("Đổi mật khẩu thành công!");
    setPasswordForm({ oldPassword: "", newPassword: "" });
  };

  if (!user) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
        <div className="d-flex align-items-center mb-4">
      <button onClick={() => navigate(-1)} className="position-relative rounded-circle border border-dark d-flex justify-content-center align-items-center" style={{ width: 45, height: 45 }}>
                <img src={muiten} height="30" style={{ transform: "rotate(180deg)"  }}></img>
                </button>
      <h3 className="position-absolute start-50 translate-middle-x">Thông tin tài khoản</h3>
        </div>
      {/* EMAIL */}
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          className="form-control"
          value={user.email}
        />
      </div>

      {/* NAME */}
      <div className="mb-3">
        <label className="form-label">Họ tên</label>
        <input
          className="form-control"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
      </div>

      {/* PHONE */}
      <div className="mb-3">
        <label className="form-label">Số điện thoại</label>
        <input
          className="form-control"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />
      </div>

      {/* ADDRESS */}
      <div className="mb-3">
        <label className="form-label">Địa chỉ</label>
        <input
          className="form-control"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
        />
      </div>

      <button
        className="btn btn-primary w-100 mb-4"
        onClick={handleUpdate}
      >
        Cập nhật thông tin
      </button>

      <hr />

      <h5 className="mt-4">Đổi mật khẩu</h5>

      <div className="mb-3">
        <input
          type="password"
          placeholder="Mật khẩu cũ"
          className="form-control"
          value={passwordForm.oldPassword}
          onChange={e =>
            setPasswordForm({ ...passwordForm, oldPassword: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          placeholder="Mật khẩu mới"
          className="form-control"
          value={passwordForm.newPassword}
          onChange={e =>
            setPasswordForm({ ...passwordForm, newPassword: e.target.value })
          }
        />
      </div>

      <button
        className="btn btn-danger w-100"
        onClick={handleChangePassword}
      >
        Đổi mật khẩu
      </button>

    </div>
  );
}