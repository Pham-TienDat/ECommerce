import "../Ads/Ads.css"
import MuiTenPhai from "../Ads/MuiTenPhai"
import MuiTenTrai from "../Ads/MuiTenTrai"
import StaticImage from "../Ads/StaticImage"
export default function Ads(){
    return(
        <div className = "ads">
        <div className = "slideAds">
         <MuiTenTrai/>
         <MuiTenPhai/>
        </div>
        <StaticImage/>
        </div>
    );
}