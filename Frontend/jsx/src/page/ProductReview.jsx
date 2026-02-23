import ProductReviewForm from "../components/ProductReviewForm"
import { useParams } from "react-router-dom";

export default function ProductReview(){
    const user_id=localStorage.getItem("user_id");
    const { id } = useParams();
    return(
        <div className="container">
            <div className="text-center h2 m-3">Đánh giá sản phẩm</div>
            <div className="pb-4"><ProductReviewForm productId={id} userId={user_id}/></div>
        </div>
    );
}