import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
const Star = ({ selected, onClick }) => (
  <span
    style={{
      cursor: 'pointer',
      fontSize: '24px',
      color: selected ? '#FFD700' : '#A9A9A9', // Màu vàng nếu được chọn, xám nếu không
      marginRight: '4px',
    }}
    onClick={onClick}
  >
    ★
  </span>
);

const ProductReviewForm = ({productId,userId}) => {
  const [rating, setRating] = useState(0); // Số sao được chọn (0 đến 5)
  const [comment, setComment] = useState(''); // Nội dung bình luận
  const [isSubmitted, setIsSubmitted] = useState(false); // Trạng thái đã gửi

  const totalStars = 5;

  // Xử lý khi người dùng chọn số sao
  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  // Xử lý khi người dùng gửi form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi gửi form mặc định của trình duyệt
    const res = await axios.post(
        "http://localhost:3000/rating",
        {   productId: productId,
            userId: Number(userId),
            rating: rating,
            comment: comment
        },
         { headers: { "Content-Type": "application/json" } }
       );
    setIsSubmitted(true);
  };
  if (isSubmitted) {
    return (
      <div style={{ padding: '20px', border: '1px solid #4CAF50', borderRadius: '8px', backgroundColor: '#E8F5E9' }}>
        <h3>✅ Cảm ơn bạn đã đánh giá!</h3>
        <Link to="/" className="btn btn-outline-secondary">
            Tiếp tục mua sắm
        </Link>
      </div>
    );
  }
  // Form đánh giá
  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', width:'100%'}}>

      {/* Phần chọn số sao */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Chọn số sao:
        </label>
        <div>
          {/* Tạo 5 ngôi sao */}
          {[...Array(totalStars)].map((_, index) => (
            <Star
              key={index}
              selected={index < rating} // Ngôi sao được chọn nếu index nhỏ hơn rating
              onClick={() => handleStarClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Phần nhập bình luận */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="comment" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Viết bình luận của bạn:
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="5"
          placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        />
      </div>

      {/* Nút gửi */}
      <button
        type="submit"
        disabled={rating === 0} // Vô hiệu hóa nút nếu chưa chọn sao
        style={{
          padding: '10px 15px',
          backgroundColor: rating === 0 ? '#A9A9A9' : '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: rating === 0 ? 'not-allowed' : 'pointer',
          fontWeight: 'bold'
        }}
      >
        Gửi Đánh giá
      </button>
      {rating === 0 && <p style={{ color: 'red', marginTop: '5px', fontSize: '12px' }}>* Vui lòng chọn số sao trước khi gửi.</p>}
    </form>
  );
};

export default ProductReviewForm;