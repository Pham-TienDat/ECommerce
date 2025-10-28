import { Link } from "react-router-dom";
export default function SignUp(){

    return(
         <div>
            <h3>Đăng ký tài khoản</h3>
            <input
              type= "text"
              placeholder="Email/Số điện thoại/Tên đăng nhập"/>
            <input
              type= "text"
              placeholder="Mật khẩu"/>
            <input
              type= "text"
              placeholder="Nhập lại mật khẩu"/>
            <button>Đăng ký</button>
            <p>Đã có tài khoản?</p>
            <Link to= "/login" >Đăng Nhập</Link>
        </div>

    )
}