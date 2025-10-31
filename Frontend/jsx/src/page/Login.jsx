import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect,useState } from 'react';

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
      const res = await axios.post(
        "http://localhost:3000/login",
        { username: username.trim(), password },
        { headers: { "Content-Type": "application/json" } }
      );
      if(res.data.message==="true"){
        setResult("Đăng nhập thành công");
        setUsername("");
        setPassword("");
      }
      else setResult("Sai tài khoản hoặc mật khẩu");
    }
    useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
    console.log(response.data); // Mảng dữ liệu người dùng
}).catch(error => {
    console.error(error);
});
}, []);
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