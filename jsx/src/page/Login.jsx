import { Link } from "react-router-dom";
export default function Login(){

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