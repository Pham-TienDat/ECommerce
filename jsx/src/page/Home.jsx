import Header from '../components/Header/Header'
import Ads from '../components/Ads/Ads'
import Categories from '../components/Categories/Categories'
import FlashSale from '../components/FlashSale/FlashSale'
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