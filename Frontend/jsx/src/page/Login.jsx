import { Link, useNavigate, useLocation} from "react-router-dom";
import axios from 'axios';
import {AuthContext} from "../AuthContext";
import {useState, useContext } from 'react';

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState("");
    const location = useLocation();
    const from = location.state?.from || "/";
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
      const res = await axios.post(
        "http://localhost:3000/login",
        { username: username.trim(), password },
        { headers: { "Content-Type": "application/json" } }
      );
      if(res.data.message==="true"){
        setUser(username);
        localStorage.setItem("user_id",JSON.stringify(res.data.user_id));
        localStorage.setItem("username",JSON.stringify(username));
        navigate(from, { replace: true });
      }
      else setResult("Sai tài khoản hoặc mật khẩu");
    }
    
    return(
        <div className=" vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
        <div className=" bg-dark-subtle text-center rounded p-3" style={{ width: '400px'}}>
            <h3>Đăng nhập</h3>
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
            <button type="submit" className=" btn btn-lg btn-secondary" >Đăng nhập</button>
            </form>
            <div className="m-3">
            <p className="mb-0">Chưa có tài khoản?</p>
            <Link to= "/signup" >Đăng ký</Link>
            </div>
        </div>
         <p>{result}</p>
        </div>
    )
}