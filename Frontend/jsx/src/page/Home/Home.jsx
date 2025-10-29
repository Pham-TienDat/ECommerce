import Header from './Header/Header'
import Ads from './Ads/Ads'
import Categories from './Categories/Categories'
import FlashSale from './FlashSale/FlashSale'
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <Header />
      <Ads/>
      <Categories/>
      <FlashSale/>
      <Link to= "/login" >Đăng nhập</Link>
      <Link to= "/signup" >Đăng ký</Link>
    </>
  )
}

export default Home