import "../Ads/Ads.css"
import MuiTenPhai from "../Ads/MuiTenPhai"
import MuiTenTrai from "../Ads/MuiTenTrai"
export default function Ads(){
    return(
        <div className = "ads">
         <MuiTenTrai/>
         <MuiTenPhai/>
        </div>
    );
}