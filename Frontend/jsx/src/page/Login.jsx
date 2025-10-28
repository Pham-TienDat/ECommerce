import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect } from 'react';

export default function Login(){
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
            <input
              type= "text"
              placeholder="Email/Số điện thoại/Tên đăng nhập"/>
            <input
              type= "text"
              placeholder="Mật khẩu"/>
            <button>Đăng nhập</button>
            <p>Chưa có tài khoản?</p>
            <Link to= "/signup" >Đăng ký</Link>
        </div>
    )
}