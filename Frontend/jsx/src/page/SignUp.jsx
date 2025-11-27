import { Link } from "react-router-dom";
import axios from 'axios';
import {useState} from 'react';
export default function SignUp(){
      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const [repassword, setRepassword] = useState("");
      const [result, setResult] = useState("");
   const handleSubmit = async (e) => {  
        e.preventDefault();
      const res = await axios.post(
        "http://localhost:3000/signup",
        { username: username.trim(), password },
        { headers: { "Content-Type": "application/json" } }
      );
      if(!(password===repassword)){
        setResult("Mật khẩu nhập lại không trùng khớp");
        return;
      }
      else{
        if(res.data.message==="true"){
        setResult("Đăng ký thành công");
        setUsername("");
        setPassword("");
        setRepassword("");
      }
        else setResult("Đã tồn tại tài khoản");}
    }


    return(
         <div className=" vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
         <div className=" bg-dark-subtle text-center rounded p-3" style={{ width: '400px'}}>
            <h3>Đăng ký tài khoản</h3>
            <form onSubmit={handleSubmit} className=" d-flex flex-column gap-3">
            <input
              type= "text"
              placeholder="Email/Số điện thoại/Tên đăng nhập"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              className="form-control"/>
            <input
              type= "text"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="form-control"/>
            <input
              type= "text"
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
         <p>{result}</p>
        </div>

    )
}