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
        console.log(localStorage);
        navigate(from, { replace: true });
      }
      else setResult("Sai tài khoản hoặc mật khẩu");
    }
    return(
        <div>
            <h3>Đăng nhập</h3>
            <form onSubmit={handleSubmit}>
            <input
              type= "text"
              placeholder="Email/Số điện thoại/Tên đăng nhập"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}/>
            <input
              type= "text"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}/>
            <button type="submit">Đăng nhập</button>
            </form>
            <p>Chưa có tài khoản?</p>
            <Link to= "/signup" >Đăng ký</Link>
            <p>{result}</p>
        </div>
    )
}