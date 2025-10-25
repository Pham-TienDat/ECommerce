import Home from './page/Home'
import Login from './page/Login'
import SignUp from './page/SignUp'
import { Routes, Route } from "react-router-dom";
function App() {
  return (
   <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
