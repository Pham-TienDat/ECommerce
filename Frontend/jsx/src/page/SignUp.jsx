import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {useState} from 'react';
import muiten from '../assets/images.png'
export default function SignUp(){
      const navigate = useNavigate();
      const [phonenumber, setPhonenumber] = useState("");
      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const [repassword, setRepassword] = useState("");
      const [name,setName] = useState("");
   const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== repassword) {
    alert("Mật khẩu nhập lại không trùng khớp");
    return;
  }

  const res = await axios.post(
    "http://localhost:3000/signup",
    {
      phonenumber: phonenumber.trim(),
      username,
      password,
      name
    },
    { headers: { "Content-Type": "application/json" } }
  );

  if (res.data.message === "true") {
    alert("Đăng ký thành công!✅");
    setUsername("");
    setPhonenumber("");
    setPassword("");
    setRepassword("");
    setName("");
  } else {
    alert("Đã tồn tại tài khoản!⚠️"); 
  }
};


    return(
         <div className=" vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
           <button
  type="button"
  onClick={() => navigate(-1)}
  className="position-fixed top-0 start-0 m-3 rounded-circle border border-dark d-flex justify-content-center align-items-center"
  style={{ width: 45, height: 45 }}
>
  <img
    src={muiten}
    height="30"
    alt="back"
    style={{ transform: "rotate(180deg)" }}
  />
</button>
         <div className=" bg-dark-subtle text-center rounded p-3" style={{ width: '400px'}}>
            <h3>Đăng ký tài khoản</h3>
            <form onSubmit={handleSubmit} className=" d-flex flex-column gap-3">
            <input
              type= "text"
              placeholder="Số điện thoại/email"
              value={phonenumber}
              onChange={(e)=>setPhonenumber(e.target.value)}
              className="form-control"/>
            <input
              type= "text"
              placeholder="Họ và tên"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="form-control"/>
            <input
              type= "text"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              className="form-control"/>
            <input
              type= "password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="form-control"/>
            <input
              type= "password"
              placeholder="Nhập lại mật khẩu"
              value={repassword}
              onChange={(e)=>setRepassword(e.target.value)}
              className="form-control"/>
            <button type="submit" className=" btn btn-lg btn-secondary" >Đăng ký</button>
            </form>
            <div className="m-3">
            <p className="mb-0">Đã có tài khoản?</p>
            <Link to= "/login" >Đăng Nhập</Link>
            </div>
        </div>
        </div>

    )
}